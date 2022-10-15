import {store} from "~/store";
import {userLoggedIn, userLoggedOut} from "~/store/user";
import UiService from "./uiService";
import AnalyticService from "./analyticService";

class AuthService {
    logoutUser() {
        UiService.hideModals();
        store.dispatch(userLoggedOut());
    }

    loginUser({token, refreshToken}: { token: string; refreshToken: string }) {
        store.dispatch(
            userLoggedIn({
                token,
                refreshToken,
            }),
        );

        AnalyticService.logLogin();
    }

    refreshUserToken({token, refreshToken}: { token: string; refreshToken: string }) {
        store.dispatch(
            userLoggedIn({
                token,
                refreshToken,
            }),
        );
    }
}

export default new AuthService();
