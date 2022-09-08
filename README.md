# react-native-ts-fb-template

### [React Native](https://reactnative.dev/) Template (RN 0.69.5)

* [TypeScript](https://www.typescriptlang.org/)
* [React Navigation](https://reactnavigation.org/)
    * [Bottom Tab Bar Navigation](https://reactnavigation.org/docs/bottom-tab-navigator/)
    * [Stack Navigation](https://reactnavigation.org/docs/stack-navigator/)
    * Login State Handler
    * Screen Tracking
* [Firebase](https://rnfirebase.io/)
    * [Analytics](https://rnfirebase.io/analytics/usage)
    * [Crashlytics](https://rnfirebase.io/crashlytics/usage)
    * [Performance](https://rnfirebase.io/perf/usage)
    * [Messaging](https://rnfirebase.io/messaging/usage)
* [Google Maps](https://github.com/react-native-maps/react-native-maps)
* [Axios](https://axios-http.com/docs/intro)
* [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
    * [MaterialIcons.ttf](https://fonts.google.com/icons?selected=Material+Icons)
    * [MaterialCommunityIcons.ttf](https://materialdesignicons.com/)
    * [FontAwesome.ttf](https://fontawesome.com/icons)
* [Redux](https://redux.js.org/)
    * [User Reducer](./docs/Stores.md) (Handling Login Status and Profile Data)
* [Redux Toolkit](https://redux.js.org/redux-toolkit/overview)
* [Redux Persist](https://github.com/rt2zz/redux-persist#readme)
* [Patch Package](https://github.com/ds300/patch-package)
* [Basic Services](#provided-services):
    * [Analytics Service](./docs/Services.md#analytics-service) (Firebase analytics wrapper)
    * [Notification Service](./docs/Services.md#notification-service) (Firebase messaging wrapper)
    * [Auth Service](./docs/Services.md#auth-service)
    * [Cache Service](./docs/Services.md#cache-service) (which already integrated to Axios)
    * [Error Handler](./docs/Services.md#error-handler)
    * [Logger](./docs/Services.md#logger) (console wrapper)
    * [Event Emitter](./docs/Services.md#event-emitter)
    * [Storage Service](./docs/Services.md#storage-service) (Async Storage Wrapper)
    * [Toast Service](./docs/Services.md#toast-service) (Using react-native-simple-toast)
    * [UI Service](./docs/Services.md#ui-service) (Currently Handling Modals)
    * [Axios api](./docs/Services.md#api-helper) with interceptors
* [Basic Components](./docs/Components.md)
  * Page Container
  * Header
  * Badge
  * Button
  * Icon
  * LinedText
  * Loading
  * Modal
  * Tabs
  * TextInput
* [Basic Utilities](./docs/Utilities.md)
  * Date utilities (using [Moment](https://momentjs.com/))
  * File Size calculator
  * String and Currency Helpers

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

* ###### for more information about Google Maps module and how to remove it refer to [GoogleMaps Doc](./docs/GoogleMaps.md)

#### Configure [Vector Icons](https://github.com/oblador/react-native-vector-icons)

* For adding or removing fonts just change `[85] iconFontNames` in `android/app/build.gradle`

#### Configure endpoints

* To use auth service requests (`login`, `refreshToken`) you can set your endpoints in 
`config/urlConfigs.ts` -> `apiEndpoints` and set `baseApiUrl`
* To handle your own logic of `login` and `refreshToken` you can modify methods in `api/authRequests.ts`

### Provided Services

Keep in mind that all services are `singleton`, so default exports are instance of class<br/>

* Some services are just wrapper for another library or tool, so the idea is that if you wanted to do some logging or
  changing base libraries, you don't need to change your whole application in different parts to remove or change
  something, just change this wrapper service and that's it

##### For read more about services and details please refer to [Services](./docs/Services.md)
