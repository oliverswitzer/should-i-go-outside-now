# Getting Started

* yarn install
* install Android Studio
  * install an Android SDK (Tools > Android > SDK Manager)
  * install an Android Simulator (Tools > Android > AVD Manager) 
* install the latest version of XCode

### Set up environment variables
* create your own version of `.env.sample`
* set up environment variables for native libraries
    * from within `ios`, run:
      * `bundle exec pod keys set "IOS_GOOGLE_MAPS_API_KEY" "<Google API Key for iOS>"`. You can find this in your [Google API settings](https://console.cloud.google.com/apis/credentials)
      * `pod install`
      * `bundle exec pod keys` should print out the value set on `IOS_GOOGLE_MAPS_API_KEY` 
    * for Android, run: `[TKTK]`--Android integration with `react-native-google-places` does not work yet.

Then to run either iOS or Android in development:

```bash
yarn ios
```

or

```bash
yarn android
```

Both of these commands should open respective simulators running the app code.