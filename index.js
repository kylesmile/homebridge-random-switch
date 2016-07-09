"use strict";

const Config = require('./lib/config');
const RandomSwitch = require('./lib/random_switch');

module.exports = function(homebridge) {
  Config.homebridge = homebridge;

  homebridge.registerAccessory("homebridge-random-switch", "RandomSwitch", RandomSwitch);
}
