const _ = require('lodash');
const {average} = require('./utils');

let priceVectors = {
  10: [],
  20: [],
  50: [],
  100: [],
  200: [],
  500: [],
  1000: []
};

class Candlestick {
  constructor(open) {
    this.timestamp = new Date();
    this.open = open;
    this.price = this.open;
    this.close = this.open;
    this.high = this.open;
    this.low = this.open;
    this.closed = false;
    this.height = Math.abs(this.open - this.close) / this.close;
    this.spread = Math.abs(this.high - this.low) / this.close;
    this.volume = 0;
    this.sma = {};
    this.setColor();
  }

  setColor() {
    let colors = {
      true: 'green',
      false: 'red'
    }
    this.color = colors[this.price >= this.open];
  }

  setClose() {
    this.closed = true;
    // Calculate all the sma averages
    this.processMovingAverages(priceVectors, this.price);
  }

  processMovingAverages(vectors, price) {
    Object.keys(vectors).forEach(period => {
      vectors[period].push(price);
      if (vectors[period].length > period) {
        vectors[period].shift();
        this.sma[period] = average(vectors[period]);
      }
    });
  }

  updatePrice(price, size, time) {
    this.timestamp = new Date(time);
    this.price = !this.closed ? price : this.price;
    this.high = this.price > this.high ? this.price : this.high;
    this.low = this.price < this.low ? this.price : this.low;
    this.close = this.price;
    this.height = Math.abs(this.open - this.close) / this.close;
    this.spread = Math.abs(this.high - this.low) / this.close;
    this.volume += size;
    this.setColor();
  }
}

module.exports = Candlestick;
