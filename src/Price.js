const _ = require('lodash');
const { EventEmitter } = require('events');
const Exchange = require('./Exchange');

let getSocket = product => new Exchange(product).websocket;
let noop = () => null;

class Price extends EventEmitter {
  constructor(product='BTC-USD') {
    super();
    this.product = product;
    this.lastPrice = null;
  }

  start() {
    this._dispatchListener();
    return this;
  }

  _msgHandler(e) {
    if (e.type === 'match') {
      this.lastPrice = Number(e.price);
      this.emit('change', e);
    }
  }

  _errorHandler(error) {
    this.emit('error', { error });
  }

  _dispatchListener() {
    const websocket = getSocket(this.product);
    websocket.on('message', this._msgHandler.bind(this));
    websocket.on('error', this._errorHandler.bind(this));
  }

  getLastPrice() {
    return this.lastPrice;
  }
}

module.exports = Price;