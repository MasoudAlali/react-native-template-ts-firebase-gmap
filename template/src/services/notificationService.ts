import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import EventEmitter from "./eventEmitter";

class NotificationService {
    enableEmitEvents() {
        this.onNotificationOpenedApp(this.#onNotificationOpenedApp);
        this.onMessage(this.#onMessage);
        this.onTokenRefresh(this.#onTokenRefresh);
    }

    getInitialNotification(): Promise<FirebaseMessagingTypes.RemoteMessage | null> {
        return messaging().getInitialNotification();
    }

    onNotificationOpenedApp(listener: (message: FirebaseMessagingTypes.RemoteMessage) => any) {
        messaging().onNotificationOpenedApp(listener);
    }

    onMessage(listener: (message: FirebaseMessagingTypes.RemoteMessage) => any) {
        messaging().onMessage(listener);
    }

    onTokenRefresh(listener: (token: string) => any) {
        messaging().onTokenRefresh(listener);
    }

    #onNotificationOpenedApp(message: FirebaseMessagingTypes.RemoteMessage) {
        EventEmitter.emit(EventEmitter.Events.Firebase.NotificationAppOpen, message);
    }

    #onMessage(message: FirebaseMessagingTypes.RemoteMessage) {
        EventEmitter.emit(EventEmitter.Events.Firebase.Message, message);
    }

    #onTokenRefresh(token: string) {
        EventEmitter.emit(EventEmitter.Events.Firebase.TokenRefresh, token);
    }

    setBackgroundMessageHandler(handler: (message: FirebaseMessagingTypes.RemoteMessage) => Promise<any>) {
        messaging().setBackgroundMessageHandler(handler);
    }

    getAPNSToken() : Promise<string | null> {
        return messaging().getAPNSToken();
    }

    getToken(): Promise<string> {
        return messaging().getToken();
    }

    async requestUserPermission(): Promise<boolean> {
        const authStatus = await messaging().requestPermission();
        return (
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL
        );
    }
}

export default new NotificationService();
