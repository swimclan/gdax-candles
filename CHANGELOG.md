# Changelog
All notable changes to this project will be documented in this file.


## [Released]

## [1.6.3] - 2019-02-07
### Fixed
- Only close the socket if it exists otherwise ignore and re-init the connection

## [1.6.2] - 2018-10-28
### Fixed
- Fixed a bug with the connection keep-alive mechanism

## [1.6.1] - 2018-10-28
### Added
- Updated dependencies to manage vulnerabilities

## [1.6.0] - 2018-10-28
### Added
- Socket heartbeat monitoring and reste functionality for connection persistence

## [1.5.3] - 2018-07-18
### Added
- Reducing Websocket bandwidth usage

## [1.5.2] - 2018-07-14
### Fixed
- Fixed volume calculations to make them based on order book matches instead of last size on ticker

## [1.5.1] - 2018-07-14
### Fixed
- Fixed bug where volumes were not consistent across different chart instances of the same product

## [1.5.0] - 2018-07-04
### Added
- Ability to instantiate multiple charts for multiple currencies simultaneously

## [1.4.2] - 2018-03-10
### Added
- Merged change and error events into price observable to get consolidated event emitter for price stream

## [1.4.1] - 2018-03-10
### Fixed
- Removed unecessary order book downloading for performance

## [1.4.0] - 2018-02-26
### Added
- Added linear regression statistics to the closed candlesticks at the same periods as the sma and ema

## [1.3.5] - 2018-02-24
### Added
- Updated README to reflect EMA feature

## [1.3.4] - 2018-02-24
### Added
- Expoential moving averages seeded by corresponding sma's

## [1.3.3] - 2018-02-24
### Added
- Additional sma periods 100, 200, 1000
- Ability to only add a sma to the candle when the period has occured

## [1.3.2] - 2018-02-24
### Fixed
- Bug in exporting chart class from index.  Some versions of node are case sensitive on module imports

## [1.3.0] - 2018-02-17
### Added
- Simple moving averages over 10, 20 and 50 candle time periods

### Fixed
- Fixed initial values for candles when no new price data is observed over the timeframe

## [1.2.1] - 2018-02-17
### Fixed
- Removed unecessary console.log

## [1.2.0] - 2018-02-17
### Added
- Volume sizes for each candlestick

### Fixed
- Inconsistencies in the high and low values.  Eliminated anomoly values that skewed candle spreads.

## [1.0.1] - 2018-01-30
### Added
- Added close, height and spread values to the open candlesticks

## [1.0.0] - 2018-01-30
### Added
- Initial featureset
- Readme
- Fixed type in Readme
