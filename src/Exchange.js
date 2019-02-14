const Gdax = require('gdax');

class Exchange {
  constructor(product) {
    this.product = product;
    this.websocket = null;
    this.lastHeartbeat = Date.now();
    this._initSocket();
    this._checkLastHeartbeat();
  }

  _initSocket(_handlers = null) {
    this.websocket = new Gdax.WebsocketClient(
      [this.product],
      'wss://ws-feed.pro.coinbase.com',
      null,
      { channels: ['matches'] }
    );
    if (_handlers) {
      this.websocket._events = _handlers;
    } else {
      this.websocket.on('error', (err) => {
        this._resetWebsocket();
      });
      this.websocket.on('message', this._heartbeatCheck.bind(this));
    }
  }

  _heartbeatCheck({type}) {
    if (type === 'heartbeat') {
      this.lastHeartbeat = Date.now();
    }
  }

  _checkLastHeartbeat() {
    setTimeout(() => {
      this._checkResetSocket(Date.now());
      this._checkLastHeartbeat();
    }, 60000);
  }

  _checkResetSocket(now) {
    const stale = now - this.lastHeartbeat > 10000;
    stale && this._resetWebsocket();
    return stale;
  }

  _resetWebsocket() {
    if (this.websocket) {
      const _newEvents = { ...this.websocket._events };
      this.websocket.removeAllListeners();
      this.websocket.socket && this.websocket.socket.close();
      this.websocket = null;
      this._initSocket(_newEvents);
    }
  }
}

module.exports = Exchange;
