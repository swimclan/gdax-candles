# Changelog
All notable changes to this project will be documented in this file.


## [Released]

## [1.3.1] - 2018-02-17
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