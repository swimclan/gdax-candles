class PriceVectors {
  constructor() {
    this[10] = [];
    this[20] = [];
    this[50] = [];
    this[100] = [];
    this[200] = [];
    this[500] = [];
    this[1000] = [];
  }
}

let instances = {};

module.exports.getInstance = (product) => {
  if (!instances[product]) {
    instances[product] = new PriceVectors();
  }
  return instances[product];
}
