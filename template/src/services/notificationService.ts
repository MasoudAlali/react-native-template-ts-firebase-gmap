import messaging from "@react-native-firebase/messaging";

class NotificationService {
	constructor() {
		this.#init();
	}

	async #init() {
		messaging().onNotificationOpenedApp(() => {
		});
		messaging().onMessage(async () => {
		});
		// messaging().setBackgroundMessageHandler(async () => {});
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
