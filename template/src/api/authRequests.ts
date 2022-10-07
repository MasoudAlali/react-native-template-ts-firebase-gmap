import api from "../services/api";
import {apiEndpoints} from "../config/urlConfigs";
import AuthService from "../services/authService";
import {AxiosError} from "axios";

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
                data: {access_token, refresh_token},
                status,
            } = await api.post(apiEndpoints.auth.login, data);

            AuthService.loginUser({
                token: access_token,
                refreshToken: refresh_token,
            });

            return {success: true, status};
        } catch (e) {
            return {
                success: false,
                status: (e as AxiosError).status,
                message: (e as AxiosError<any>)?.response?.data?.errorReason
            };
        }
    }
}

export default new AuthRequests();
