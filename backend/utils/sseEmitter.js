const EventEmitter = require('events');
class SSEEmitter extends EventEmitter {}
const sseEmitter = new SSEEmitter();
module.exports = sseEmitter;
