const _ = require('lodash');
const Price = require('./Price');
const Clock = require('./Clock');
const Candlestick = require('./Candlestick');
const { Observable } = require('rxjs/Rx');
const { EventEmitter } = require('events');

class Chart extends EventEmitter {
  constructor({ product='BTC-USD', timeframe='1s' }) {
    super();
    this.product = product;
    this.timeframe = timeframe;
    this.price = new Price(this.product).start();
    this.clock = new Clock.getInstance(this.timeframe).start();
    this.price$ = Observable.merge(
      Observable.fromEvent(this.price, 'change'),
      Observable.fromEvent(this.price, 'error').mergeMap(err => Observable.throw(err))
    );
    this.clock$ = Observable.fromEvent(this.clock, 'tick');
    this.candles = [];
    this.currentCandle = null;
    this.lastClose = null;
  }

  closeCandle() {
    this.currentCandle.setClose();
    this.lastClose = this.currentCandle.close;
    this.candles.push(_.assign({}, this.currentCandle));
    this.emit('close', this.currentCandle);
  }

  openCandle() {
    this.currentCandle = new Candlestick(this.lastClose || this.price.getLastPrice(), this.product);
    this.emit('open', this.currentCandle);
  }

  start() {
    this.clock$
    .switchMap(tick => {
      let myTick = tick.indexOf(this.timeframe) !== -1;
      myTick && this.currentCandle && this.closeCandle();
      (myTick || !this.currentCandle) && this.openCandle();
      return this.price$
      .map(match => {
        this.currentCandle.updatePrice(Number(match.price), Number(match.size), match.time);
        return this.currentCandle;
      });
    }).subscribe(
      candle => this.emit('change', candle),
      error => this.emit('error', error)
    );
    return this;
  }
}

module.exports = Chart;