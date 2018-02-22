const _ = require('lodash');
const {average} = require('./utils');

let last10 = [];
let last20 = [];
let last50 = [];

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
    this.sma = {
      10: null,
      20: null,
      50: null
    }
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
    last10.push(this.price);
    if (last10.length > 10) { last10.shift(); }
    this.sma[10] = average(last10);
    
    last20.push(this.price);
    if (last20.length > 20) { last20.shift(); }
    this.sma[20] = average(last20);

    last50.push(this.price);
    if (last50.length > 50) { last50.shift(); }
    this.sma[50] = average(last50);
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
