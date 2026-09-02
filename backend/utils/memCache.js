const memCache = {
  data: {},
  get: function(key, ttl = 30000) {
    if (this.data[key] && (Date.now() - this.data[key].timestamp < ttl)) {
      return this.data[key].value;
    }
    return null;
  },
  set: function(key, value) {
    this.data[key] = { value, timestamp: Date.now() };
  },
  del: function(key) {
    delete this.data[key];
  },
  clear: function() {
    this.data = {};
  }
};

module.exports = memCache;
