const Gdax = require('gdax');

class Exchange {
  constructor(product) {
    this.product = product;

    this.websocket = new Gdax.WebsocketClient([this.product]);
    this._initSocket();

    let orderbookSync = new Gdax.OrderbookSync([this.product]);
    this.orderbook = orderbookSync.books[this.product];
  }

  _initSocket() {
    this.websocket.on('open', () => {
      console.log('Websocket connected');
      this.websocket.subscribe({ product_ids: [this.product], channels: ['ticker'] });
    });
    this.websocket.on('error', (err) => {
      console.log(err);
    });
  }
}

let instance;

module.exports.getInstance = (product) => {
  if (!instance) {
    instance = new Exchange(product);
  }
  return instance;
};
