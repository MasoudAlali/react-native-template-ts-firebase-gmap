import analytics from "@react-native-firebase/analytics";

class AnalyticService {
	constructor() {
		this.#init();
	}

	async #init() {
		await analytics().logAppOpen();
	}

	logLogin() {
		analytics().logLogin({
			method: "normal",
		});
	}

	logScreenView(screenName?: string) {
		if (screenName) {
			analytics().logScreenView({
				screen_name: screenName,
				screen_class: screenName,
			});
		}
	}
}

export default new AnalyticService();
