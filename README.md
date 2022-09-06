# react-native-ts-fb-template

### [React Native](https://reactnative.dev/) Template (RN 0.69.5)
* TypeScript
* [React Navigation](https://reactnavigation.org/)
  * Bottom Tab Bar Navigation
  * Stack Navigation
  * Login State Handler
  * Screen Tracking
* [Firebase](https://rnfirebase.io/)
* [Google Maps](https://github.com/react-native-maps/react-native-maps)
* [Axios](https://axios-http.com/docs/intro)
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
  * MaterialIcons.ttf
  * MaterialCommunityIcons.ttf
  * FontAwesome.ttf
* [Redux](https://redux.js.org/)
  * General Reducer (Currently Handling Modals)
  * User Reducer (Handling Login Status and Profile Data)
* [Redux Toolkit](https://redux.js.org/redux-toolkit/overview)
* Basic Services:
  * Analytics Service (Firebase Wrapper)
  * Auth Service
  * Cache Service (which already integrated to Axios)
  * Error Handler
  * Logger
  * Event Emitter
  * Storage Service (Async Storage Wrapper)
  * Toast Service (Using react-native-simple-toast)
  * UI Service (Currently Handling Modals)


### Instructions
* Init react-native project with template
```shell
react-native init [project-name] --template https://github.com/MasoudAlali/react-native-ts-fb-template
```
#### Configure [Firebase](https://rnfirebase.io/)
* Configure your project in [Firebase Console](https://console.firebase.google.com)
* Download your `GoogleService-Info.plist` and replace (overwrite) it in `ios` directory
* Download your `google-services.json` and replace (overwrite) it in `android/app` directory

Note that we are using 'analytics', 'messaging', 'performance', 'crashlytics' modules
you can add or remove any module based on RN Firebase documentation 

###### Disable Firebase (if you don't want it)
* Remove firebase dependencies
  * `@react-native-firebase/analytics`
  * `@react-native-firebase/app`
  * `@react-native-firebase/crashlytics`
  * `@react-native-firebase/messaging`
  * `@react-native-firebase/perf`
* Remove `ios/GoogleService-Info.plist` and `android/app/google-services.json`
* Comment below lines in your `ios/Podfile`:
  * [7] `$RNFirebaseAsStaticFramework = true`
  * [10] `$static_framework = []`
  * [15] `use_frameworks! :linkage => :static`
  * [38-76]
* Reinstall your pods (`npx pod-install`)
* Comment below lines in your `ios/[project-name]/AppDelegate.mm`:
  * [10] `#import <Firebase.h>`
  * [38] `[FIRApp configure];`
* Comment lines `[27-29]` in your `android/build.gradle`:
  * ```
    classpath("com.google.gms:google-services:4.3.13")
    classpath("com.google.firebase:perf-plugin:1.4.1")
    classpath("com.google.firebase:firebase-crashlytics-gradle:2.9.1")
    ```
* Comment lines `[2-3]` in your `android/app/build.gradle`:
  * ```
    apply plugin: 'com.google.gms.google-services'
    apply plugin: 'com.google.firebase.crashlytics'
    ```

#### Configure [Google Maps](https://github.com/react-native-maps/react-native-maps)
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


#### Configure [Vector Icons](https://github.com/oblador/react-native-vector-icons)
* For adding or removing fonts just change `[85] iconFontNames` in `android/app/build.gradle`

### Provided Services
##### Analytics Service
the idea is to wrap firebase/analytics in this service to have other trackers more easy to integrate <br/>
so basically you can implement and add your functions to it, currently we have `logLogin` and `logScreenView` functions 
##### Auth Service
this service is responsible for doing normal auth functionalities
