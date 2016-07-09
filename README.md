# homebridge-random-switch

Plugin for [homebridge](https://github.com/nfarina/homebridge) that creates fake switches which turn themselves off a random amount of time after being turned on.

# Installation

```
npm install -g kylesmile/homebridge-random-switch
```

# Configuration

Add the device as an accessory in homebridge's `config.json`.

Example `config.json`:
```json
"accessories": {
    "accessory": "RandomSwitch",
    "name": "My Random Switch",
    "minimumDuration": 5,
    "maximumDuration": 10
  }
}
```

The switch will turn itself off between `minimumDuration` and `maximumDuration` seconds after being turned on. `minimumDuration` is optional and defaults to `0`. `maximumDuration` is required.
