import { navigate } from "../navigators/Root";
import { store } from "../store";
import { userLoggedIn, userLoggedOut } from "../store/user";
import UiService from "./uiService";
import AnalyticService from "./analyticService";

class AuthService {
	isLoggedIn: boolean = false;
	token: string = "";
	refreshToken: string = "";

	constructor() {
		store.subscribe(() => this.#updateValues());
		this.#updateValues();
	}

	#updateValues() {
		const { isLoggedIn, token, refreshToken } = store.getState().user || {};

		this.token = token || "";
		this.refreshToken = refreshToken || "";
		this.isLoggedIn = isLoggedIn;
	}

	logoutUser() {
		this.token = "";
		this.refreshToken = "";
		this.isLoggedIn = false;

		UiService.hideModals();
		store.dispatch(userLoggedOut());

		navigate("LoginPage");
	}

	loginUser({ token, refreshToken }: { token: string; refreshToken: string }) {
		this.token = token;
		this.refreshToken = refreshToken;
		this.isLoggedIn = true;

		store.dispatch(
			userLoggedIn({
				token,
				refreshToken,
			}),
		);
		navigate("Main");

		AnalyticService.logLogin();
	}

	refreshUserToken({ token, refreshToken }: { token: string; refreshToken: string }) {
		this.token = token;
		this.refreshToken = refreshToken;
		this.isLoggedIn = true;

		store.dispatch(
			userLoggedIn({
				token,
				refreshToken,
			}),
		);
	}

	getToken() {
		return this.token || store.getState().user.token || "";
	}

	isUserLoggedIn() {
		return this.isLoggedIn || store.getState().user.isLoggedIn || false;
	}

	getRefreshToken() {
		return this.refreshToken || store.getState().user.refreshToken || "";
	}
}

export default new AuthService();
