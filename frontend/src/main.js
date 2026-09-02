import { createApp } from 'vue'
import App from './App.vue'
import router from './router' 
import './style.css'

// Global fetch caching for API GET requests (5 minutes)
const originalFetch = window.fetch;
const CACHE_EXPIRY = 5 * 60 * 1000;

window.clearFetchCache = () => {
  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('duc_fetch_cache_')) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch(e) {}
};

window.fetch = async (resource, config) => {
  let url = '';
  let method = 'GET';

  if (typeof resource === 'string') {
    url = resource;
  } else if (resource instanceof Request) {
    url = resource.url;
    method = resource.method;
  } else if (resource && resource.toString) {
    url = resource.toString();
  }

  if (config && config.method) {
    method = config.method;
  }
  
  method = method.toUpperCase();

  // Only cache GET requests directed to the API
  if (method !== 'GET' || !url.includes('/api/')) {
    if (['POST', 'PUT', 'DELETE'].includes(method)) {
      window.clearFetchCache();
    }
    return originalFetch(resource, config);
  }

  const cacheKey = `duc_fetch_cache_${url}`;

  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_EXPIRY) {
        // Return a mocked Response object
        return new Response(JSON.stringify(parsed.data), {
          status: 200,
          statusText: 'OK',
          headers: new Headers({ 'Content-Type': 'application/json' })
        });
      } else {
        localStorage.removeItem(cacheKey);
      }
    }
  } catch (e) {
    console.warn('Cache read error:', e);
  }

  // Make the actual network request
  const response = await originalFetch(resource, config);

  // If successful, clone and store in cache
  if (response.ok) {
    const clone = response.clone();
    try {
      const contentType = clone.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const data = await clone.json();
        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now(),
          data: data
        }));
      }
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        // Clear all our custom caches to free up space
        Object.keys(localStorage).forEach(key => {
          if (key.startsWith('duc_fetch_cache_')) {
            localStorage.removeItem(key);
          }
        });
        console.warn('LocalStorage quota exceeded, cleared API caches.');
      } else {
        console.warn('Cache write error:', e);
      }
    }
  }

  return response;
};

const app = createApp(App)
app.use(router) 
app.mount('#app')