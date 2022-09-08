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
    * User Reducer (Handling Login Status and Profile Data)
* [Redux Toolkit](https://redux.js.org/redux-toolkit/overview)
* [Redux Persist](https://github.com/rt2zz/redux-persist#readme)
* Basic Services:
    * Analytics Service (Firebase analytics wrapper)
    * Notification Service (Firebase messaging wrapper)
    * Auth Service
    * Cache Service (which already integrated to Axios)
    * Error Handler
    * Logger (console wrapper)
    * Event Emitter
    * Storage Service (Async Storage Wrapper)
    * Toast Service (Using react-native-simple-toast)
    * UI Service (Currently Handling Modals)
    * Axios api with interceptors

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

Keep in mind that all services are `singleton`, so default exports are instance of class<br/>

* Some services are just wrapper for another library or tool, so the idea is that if you wanted to do some logging or
  changing base libraries, you don't need to change your whole application in different parts to remove or change
  something, just change this wrapper service and that's it

##### Analytics Service

The idea is to wrap firebase/analytics in this service to have other trackers easier to integrate <br/>
so basically you can implement and add your functions to it, currently we have `logLogin` and `logScreenView` functions

you can find firebase analytics docs in [RN Firebase](https://rnfirebase.io/analytics/usage)

##### Notification Service

This service is a wrapper fot `Firebase Messaging` module for basic functions<br/>
you can find firebase messaging docs in [RN Firebase](https://rnfirebase.io/messaging/usage)

* It has some prepared functions to use this service with `EventEmitter`

* ###### for more information about Notification Service and how to use it refer to [NotificationService](./docs/NotificationService.md)

##### Auth Service

This service is responsible for doing normal auth functionalities in terms of persisting data and accessing them, this
service mainly will be manipulated by AuthRequests<br/>
it will subscribe and dispatch on `user reducer`

* ###### for more information about AuthService module and how to use it refer to [AuthService doc](./docs/AuthService.md)

##### Cache Service

This service is responsible for maintain requests cache data which are handled by axios interceptors and persist them
using StorageService<br/>
requests with `get` method will be persisted with `url + params` key and value of whole response with some expire time

* ###### for more information about CacheService module and how to use it refer to [CacheService doc](./docs/CacheService.md)

##### Error Handler

This service is responsible for showing errors to user using `ToastService.showMessage` with `error` type<br/>

* This module will export `errorHandling` function as default which need `error` as argument, you should just pass your
  axios error response to it `AxiosError<ErrorResponseType>`
* It has some kind of debounce and deduplication, which will filter duplicate messages in given time frame
* You can specify some filtering to prevent some messages to be shown to user

but for sure you can use base `ErrorHandler` class separately

* ###### for more information about ErrorHandler module and how to use it refer to [ErrorHandler doc](./docs/ErrorHandler.md)

##### Event Emitter

This service is very simple connection between listeners and emitters, listeners listen on specific eventName and
emitters will emit on that specific eventName and pass the params

so it's a helper to call whatever listener in anywhere from anywhere you want

for example if you want to show a `Modal` which is used in `App.tsx`, you can
emit `EventEmitter.Events.General.ShowModal()` and that's it, `Modal` Component will be called by it's listener

* ###### for more information about EventEmitter module and how to use it refer to [EventEmitter](./docs/EventEmitter.md)

##### Logger

This service is easily a wrapper for console with all those functions, the only difference is that first argument of
functions will be a key which is defined in same module, and you can enable or disable that logs

* ###### for more information about Logger module and how to use it refer to [Logger](./docs/Logger.md)

##### Storage Service

This service is a wrapper for [Async Storage](https://github.com/react-native-async-storage/async-storage) which wrap
some basic functions and will handle `JSON` format in operations <br/>

* `get` to retrieve some value from storage (you can provide default value if value is missing in storage)
* `set` to put some value in storage
* `remove` to remove some value in storage

##### Toast Service

This service is just a basic tool to have some toast messages in your application, currently it's used
in `ErrorHandler`<br/>

* the base library used in this service
  is [react-native-simple-toast](https://github.com/xgfe/react-native-simple-toast)
* this version just has `showMessage` method which has a type and message with some duration, and will show simple toast

```typescript
type ToastTypes = "error" | "success" | "danger" | "info"

showMessage(type: ToastTypes = "info", message: string, duration: number = SimpleToast.SHORT) => void
```

* you can implement your own toast component and handle its logic in this method
* the benefit of using this service even this simple, is that you can use it everywhere and whenever you wanted to have
  some `Toast` component you can easily just handle it here

##### UI Service

This service will handle all the logics and methods you need to modify your `UI` parts<br/>
for example currently we are using it for showing `Modals`, and it simply will emit related event with some params

* `showModal` which will receive `ShowModalParams` and emit related event with params
* `hideModals` which will emit related event to hide all Modals
