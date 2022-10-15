import analytics from "@react-native-firebase/analytics";

class AnalyticService {
    constructor() {
        this.#init();
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

    async #init() {
        await analytics().logAppOpen();
    }
}

export default new AnalyticService();
