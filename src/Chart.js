const _ = require('lodash');
const Price = require('./price');
const Clock = require('./clock');
const Candlestick = require('./Candlestick');
const { Observable } = require('rxjs/Rx');
const { EventEmitter } = require('events');

class Chart extends EventEmitter {
  constructor({ product='BTC-USD', timeframe='1s' }) {
    super();
    this.price = new Price(product).start();
    this.clock = new Clock(timeframe).start();
    this.price$ = Observable.fromEvent(this.price, 'change');
    this.clock$ = Observable.fromEvent(this.clock, 'tick');
    this.candles = [];
    this.currentCandle = null;
    this.lastClose = null;
  }

  start() {
    this.clock$
    .switchMap(tick => {
      if (this.currentCandle) {
        this.currentCandle.setClose();
        this.emit('close', this.currentCandle);
        this.lastClose = this.currentCandle.close;
        this.candles.push(_.assign({}, this.currentCandle));
      }
      this.currentCandle = new Candlestick(this.lastClose || this.price.getLastPrice());
      this.emit('open', this.currentCandle);
      return this.price$
      .map(order => {
        this.currentCandle.updatePrice(Number(order.price), order.time);
        return this.currentCandle;
      });
    }).subscribe(candle => this.emit('change', candle));
    return this;
  }
}

module.exports = Chart;