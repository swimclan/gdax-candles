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

  _dispatchListener() {
    const websocket = getSocket(this.product);
    websocket.on('message', (e) => {
      if (e.type === 'ticker') {
        this.lastPrice = Number(e.price);
        this.emit('change', e);
      }
    });
    websocket.on('error', (error) => {
      this.emit('error', { error });
    });
  }

  getLastPrice() {
    return this.lastPrice;
  }
}

module.exports = Price;