const _ = require('lodash');

class Candlestick {
  constructor(open) {
    this.timestamp = new Date();
    this.open = open;
    this.price = this.open;
    this.close = null;
    this.high = this.open;
    this.low = this.open;
    this.closed = false;
    this.height = null;
    this.spread = null;
  }

  setColor() {
    let colors = {
      true: 'green',
      false: 'red'
    }
    this.color = colors[this.price >= this.open];
  }

  setClose() {
    this.close = this.price;
    this.height = Math.abs(this.open - this.close) / this.close;
    this.spread = Math.abs(this.high - this.low) / this.close;
    this.setColor();
    this.closed = true;
  }

  updatePrice(price, time) {
    this.timestamp = new Date(time);
    this.price = !this.closed ? price : this.price;
    this.high = this.price > this.high ? this.price : this.high;
    this.low = this.price < this.low ? this.price : this.low;
    this.setColor();
  }
}

module.exports = Candlestick;
