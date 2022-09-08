### Notification Service

This service is a wrapper fot `Firebase Messaging` module for basic functions<br/>
you can find firebase messaging docs in [RN Firebase](https://rnfirebase.io/messaging/usage)

* It has some prepared functions to use this service with `EventEmitter`

##### Methods
```typescript
enableEmitEvents() => void
```
will enable emit for `onNotificationOpenedApp`, `onMessage`, `onTokenRefresh` and you can see 
related event names in `EventEmitter` module

```typescript
getInitialNotification() => Promise<FirebaseMessagingTypes.RemoteMessage | null>
```
it will return `RemoteMessage` that caused app to be opened, it can be `null` if app opened without notification

```typescript
onNotificationOpenedApp(listener: (message: FirebaseMessagingTypes.RemoteMessage) => any) => void
onMessage(listener: (message: FirebaseMessagingTypes.RemoteMessage) => any) => void
onTokenRefresh(listener: (token: string) => any) => void
setBackgroundMessageHandler(handler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<any>) => void
getAPNSToken() => Promise<string | null>
getToken() => Promise<string>
```
these are methods of `RNFirebase` which you can refer to its docs to check them out

```typescript
async requestUserPermission() => Promise<boolean>
```
this method will request for user notification permission, and will return boolean of authorization
