const _ = require('lodash');
const { EventEmitter } = require('events');
const Gdax = require('gdax');

let getSocket = product => new Gdax.WebsocketClient([product]);
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
      if (e.type === 'done' && e.reason === 'filled' && e.price) {
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