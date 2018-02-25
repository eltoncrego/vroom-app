fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## Android
### android build
```
fastlane android build
```
Build a debug version of the app locally
### android test_internal
```
fastlane android test_internal
```
Deploy a new internal testing build to Google Play Store
### android test_external
```
fastlane android test_external
```
Deploy a new external testing build to Google Play Store
### android deploy
```
fastlane android deploy
```
Deploy a new production build to Google Play Store

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
