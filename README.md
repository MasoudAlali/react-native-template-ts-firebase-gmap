# react-native-ts-fb-template

### [React Native](https://reactnative.dev/) Template (RN 0.69.5)
* TypeScript
* [React Navigation](https://reactnavigation.org/)
  * [Bottom Tab Bar Navigation](https://reactnavigation.org/docs/bottom-tab-navigator/)
  * [Stack Navigation](https://reactnavigation.org/docs/stack-navigator/)
  * Login State Handler
  * Screen Tracking
* [Firebase](https://rnfirebase.io/)
* [Google Maps](https://github.com/react-native-maps/react-native-maps)
* [Axios](https://axios-http.com/docs/intro)
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
  * [MaterialIcons.ttf](https://fonts.google.com/icons?selected=Material+Icons)
  * [MaterialCommunityIcons.ttf](https://materialdesignicons.com/)
  * [FontAwesome.ttf](https://fontawesome.com/icons)
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

* #### Configure [Firebase](https://rnfirebase.io/)
* Configure your project in [Firebase Console](https://console.firebase.google.com)
* Download your `GoogleService-Info.plist` and replace (overwrite) it in `ios` directory
* Download your `google-services.json` and replace (overwrite) it in `android/app` directory

Note that we are using 'analytics', 'messaging', 'performance', 'crashlytics' modules
you can add or remove any module based on RN Firebase documentation 

* ###### for more information about firebase module and how to remove it refer to [Firebase Doc](./docs/Firebase.md)

* #### Configure [Google Maps](https://github.com/react-native-maps/react-native-maps)
* Configure your project in [Google Cloud Panel](https://cloud.google.com)
  * Be sure that you enable Android Maps SDK and iOS Maps SDK
* Replace retrieved token and replace to below files:
  * [28] "GOOGLE_MAPS_API_KEY" in `android/src/main/AndroidManifest.xml`
  * [37] "GOOGLE_MAPS_API_KEY" in `ios/[project-name]/AppDelegate.mm`

* ###### for more information about google maps module and how to remove it refer to [GoogleMaps Doc](./docs/GoogleMaps.md)

#### Configure [Vector Icons](https://github.com/oblador/react-native-vector-icons)
* For adding or removing fonts just change `[85] iconFontNames` in `android/app/build.gradle`

### Provided Services
##### Analytics Service
The idea is to wrap firebase/analytics in this service to have other trackers more easy to integrate <br/>
so basically you can implement and add your functions to it, currently we have `logLogin` and `logScreenView` functions 

##### Auth Service
This service is responsible for doing normal auth functionalities in term of persisting data and accessing them, this service mainly will be manipulated by AuthRequests<br/>
it will subscribe and dispatch on `user reducer`

* ###### for more information about AuthService module and how to use it refer to [AuthService doc](./docs/AuthService.md)
