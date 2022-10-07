import { AxiosError } from "axios";
import ToastService from "./toastService";

export interface ErrorResponseType {
	error: string;
}

class ErrorHandler {
    #messages: any[] = [];

    debounce: number = 15000;

    hiddenMessages: string[] = [];

    hiddenParts: string[] = [];

    constructor() {
        this.#initIntervals();
    }

    #purgeOldMessages = () => {
        this.#messages = this.#messages.filter((i) => i.expiresIn > Date.now());
    };

    #initIntervals = () => {
        setInterval(this.#purgeOldMessages, this.debounce);
    };

    handleMessage = (errorMessage: string, forceShow: boolean = false) => {
        if (forceShow) return ToastService.showMessage("error", errorMessage);

        const shouldShow =
			!this.hiddenMessages.includes(errorMessage) &&
			!this.#messages.some((i) => i.message === errorMessage) &&
			!this.hiddenParts.some((i) => errorMessage.includes(i));

        if (!shouldShow) return null;

        this.#messages.push({
            message: errorMessage,
            expiresIn: Date.now() + this.debounce,
        });

        return ToastService.showMessage("error", errorMessage);
    };

    handleError(error: AxiosError<ErrorResponseType>, forceShow: boolean = false) {

        let message = error.response?.data?.error || error.message;

        if (message) this.handleMessage(message, forceShow);
    }
}

export default new ErrorHandler();
