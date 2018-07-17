const Gdax = require('gdax');

class Exchange {
  constructor(product) {
    this.product = product;

    this.websocket = new Gdax.WebsocketClient(
      [this.product],
      'wss://ws-feed.pro.coinbase.com',
      null,
      { channels: ['matches'] }
    );
    this._initSocket();
  }

  _initSocket() {
    this.websocket.on('error', (err) => {
      console.log(err);
    });
  }
}

module.exports = Exchange;
