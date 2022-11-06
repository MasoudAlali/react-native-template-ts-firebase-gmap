### [Firebase](https://rnfirebase.io/)

##### Configure Firebase
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
```diff
- $RNFirebaseAsStaticFramework = true
$dynamic_framework += [
- 'GoogleUtilities',
- 'Firebase',
- 'FirebaseABTesting',
- 'FirebaseAnalytics',
- 'FirebaseCore',
- 'FirebaseCoreDiagnostics',
- 'FirebaseCoreExtension',
- 'FirebaseCoreInternal',
- 'FirebaseCrashlytics',
- 'FirebaseInstallations',
- 'FirebaseMessaging',
- 'FirebasePerformance',
- 'FirebaseRemoteConfig'
]
```
* Reinstall your pods (`npx pod-install`)
* Comment below lines in your `ios/[project-name]/AppDelegate.mm`:
```diff
- #import <Firebase.h>
- [FIRApp configure];
```
* Comment below lines in your `android/build.gradle`:
```diff
- classpath("com.google.gms:google-services:4.3.13")
- classpath("com.google.firebase:perf-plugin:1.4.1")
- classpath("com.google.firebase:firebase-crashlytics-gradle:2.9.1")
```
* Comment below lines in your `android/app/build.gradle`:
```diff
- apply plugin: 'com.google.gms.google-services'
- apply plugin: 'com.google.firebase.crashlytics'
```
