"use strict";

const Config = require('./config');
let Service, Characteristic;

class MaximumDurationError extends Error {};

module.exports = class RandomSwitch {
  constructor(log, config) {
    if (!Service) Service = Config.homebridge.hap.Service;
    if (!Characteristic) Characteristic = Config.homebridge.hap.Characteristic;
    if (!config.maximumDuration || Math.ceil(config.maximumDuration) !== config.maximumDuration) {
      throw new MaximumDurationError('maximumDuration must be set to an integer number of seconds greater than 0');
    }
    this.log = log;
    this._name = config.name;
    this._minimumDuration = config.minimumDuration;
    this._maximumDuration = config.maximumDuration;

    this.service().getCharacteristic(Characteristic.On)
      .on('set', this.setOn.bind(this));
  }

  getServices() {
    return [this._service];
  }

  setOn(on, callback) {
    this.log('Setting switch to ' + on);

    if (on) {
      let duration = this.onDuration();
      this.log(`Turning off in ${duration/1000} seconds`);
      setTimeout(() => {
        this.service().setCharacteristic(Characteristic.On, false);
      }, duration);
    }

    callback();
  }

  name() {
    return this._name;
  }

  service() {
    if (!this._service) {
      this._service = new Service.Switch(this.name());
    }
    return this._service;
  }

  config() {
    return this._config;
  }

  maximumDuration() {
    return this._maximumDuration;
  }

  minimumDuration() {
    return this._minimumDuration || 0;
  }

  onDuration() {
    const max = this.maximumDuration();
    const min = this.minimumDuration();
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
  }
}
