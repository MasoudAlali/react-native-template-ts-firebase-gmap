import {AxiosError} from "axios";
import ToastService from "./toastService";

export interface ErrorResponseType {
    error: string;
}

class ErrorHandler {
    debounce: number = 15000;
    hiddenMessages: string[] = [];
    hiddenParts: string[] = [];
    private _messages: any[] = [];

    constructor() {
        this.#initIntervals();
    }

    handleMessage = (errorMessage: string, forceShow: boolean = false) => {
        if (forceShow) return ToastService.showMessage("error", errorMessage);

        const shouldShow =
            !this.hiddenMessages.includes(errorMessage) &&
            !this._messages.some((i) => i.message === errorMessage) &&
            !this.hiddenParts.some((i) => errorMessage.includes(i));

        if (!shouldShow) return null;

        this._messages.push({
            message: errorMessage,
            expiresIn: Date.now() + this.debounce,
        });

        return ToastService.showMessage("error", errorMessage);
    };

    handleError(error: AxiosError<ErrorResponseType>, forceShow: boolean = false) {

        let message = error.response?.data?.error || error.message;

        if (message) this.handleMessage(message, forceShow);
    }

    #purgeOldMessages = () => {
        this._messages = this._messages.filter((i) => i.expiresIn > Date.now());
    };

    #initIntervals = () => {
        setInterval(this.#purgeOldMessages, this.debounce);
    };
}

export default new ErrorHandler();
