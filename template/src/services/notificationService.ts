import messaging, { FirebaseMessagingTypes } from "@react-native-firebase/messaging";
import EventEmitter from "./eventEmitter";

class NotificationService {
	eminEvents() {
		this.onNotificationOpenedApp(this.#onNotificationOpenedApp);
		this.onMessage(this.#onMessage);
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

	#onNotificationOpenedApp(message: FirebaseMessagingTypes.RemoteMessage) {
		EventEmitter.emit(EventEmitter.Events.Firebase.NotificationAppOpen(), message);
	}

	#onMessage(message: FirebaseMessagingTypes.RemoteMessage) {
		EventEmitter.emit(EventEmitter.Events.Firebase.Message(), message);
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

	async requestUserPermission() {
		const authStatus = await messaging().requestPermission();
		return (
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL
		);
	}
}

export default new NotificationService();
