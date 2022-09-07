#### [Google Maps](https://github.com/react-native-maps/react-native-maps)

##### Configure Google Maps
* Configure your project in [Google Cloud Panel](https://cloud.google.com)
    * Be sure that you enable Android Maps SDK and iOS Maps SDK
* Replace retrieved token and replace to below files:
    * [28] "GOOGLE_MAPS_API_KEY" in `android/src/main/AndroidManifest.xml`
    * [37] "GOOGLE_MAPS_API_KEY" in `ios/[project-name]/AppDelegate.mm`

###### Disable Google Maps (if you don't want it)
* Remove google maps dependencies
    * `react-native-maps`
* Comment below lines in your `ios/Podfile`:
    * [11] `rn_maps_path = '../node_modules/react-native-maps'`
    * [20] `pod 'react-native-google-maps', :path => rn_maps_path`
    * [38-45]
* Reinstall your pods (`npx pod-install`)
* Comment below lines in your `ios/[project-name]/AppDelegate.mm`:
    * [9] `#import <GoogleMaps/GoogleMaps.h>`
    * [37] `[GMSServices provideAPIKey:@"GOOGLE_MAPS_API_KEY"];`
* Comment lines `[26-28]` in your `android/app/src/main/AndroidManifest.xml`:

