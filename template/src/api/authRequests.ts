import api from "../services/api";
import { apiEndpoints } from "../config/urlConfigs";
import AuthService from "../services/authService";
import { AxiosError } from "axios";

class AuthRequests {
	async login({
		username,
		password,
		captchaToken,
		captchaValue,
	}: {
		username: string;
		password: string;
		captchaToken: string;
		captchaValue: string;
	}) {
		try {
			const data = {
				username,
				password,
				captcha_answer: captchaValue,
				captcha_token: captchaToken,
				grant_type: "password",
			};

			const {
				data: { access_token, refresh_token, ...rest },
				status,
			} = await api.post(apiEndpoints.auth.login, data);

			AuthService.loginUser({
				token: access_token,
				refreshToken: refresh_token,
			});

			return { success: true, status };
		} catch (e) {
			return {
				success: false,
				status: (e as AxiosError).status,
				message: (e as AxiosError<any>)?.response?.data?.errorReason
			};
		}
	}

	async refreshToken() {
		const data = {
			refresh_token: AuthService.getRefreshToken(),
			grant_type: "refresh_token",
		};

		const {
			data: { access_token, refresh_token },
			status,
		} = await api.post(apiEndpoints.auth.refreshToken, data);

		if (status !== 200) return AuthService.logoutUser();

		AuthService.refreshUserToken({ token: access_token, refreshToken: refresh_token });

		return true;
	}
}

export default new AuthRequests();
