const EventEmitter = require('events').EventEmitter;
const { timeframeToSec, nextTime } = require('./utils');

class Clock extends EventEmitter {
  constructor(resolution='1s') {
    super();
    this.resolution = timeframeToSec(resolution);
  }

  start() {
    this.now = Date.now().valueOf();
    this.nextTime();
    setInterval(this.tick.bind(this), 1);
    return this;
  }

  tick() {
    this.now = Date.now().valueOf();
    if (this.now >= this.next) {
      this.nextTime();
      this.emit('tick', new Date(this.now));
    }
  }

  nextTime() {
    return this.next = nextTime(this.now, this.resolution);
  }
}

module.exports = Clock;
