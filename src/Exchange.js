const Gdax = require('gdax');

class Exchange {
  constructor(product) {
    this.product = product;

    this.websocket = new Gdax.WebsocketClient([this.product]);
    this.websocket = new Gdax.WebsocketClient(
      [this.product],
      'wss://ws-feed.pro.coinbase.com',
      null,
      { channels: ['full'] }
    );
    this._initSocket();
  }

  _initSocket() {
    this.websocket.on('open', () => {
      this.websocket.subscribe({ product_ids: [this.product], channels: ['ticker'] });
    });
    this.websocket.on('error', (err) => {
      console.log(err);
    });
  }
}

module.exports = Exchange;
