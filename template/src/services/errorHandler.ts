import { AxiosError } from "axios";
import ToastService from "./toastService";

class ErrorHandler {
	messages: any[];

	debounce: number;

	filteredMessages: string[];

	messagesFilter: string[];

	constructor() {
		this.messages = [];
		this.debounce = 15000;
		this.filteredMessages = [];
		this.messagesFilter = [];

		this.initIntervals();
	}

	purgeOldMessages = () => {
		this.messages = this.messages.filter((i) => i.expiresIn > Date.now());
	};

	initIntervals = () => {
		setInterval(this.purgeOldMessages, this.debounce);
	};

	handleError = (errorMessage: string, forceShow: boolean = false) => {
		if (forceShow) return ToastService.showMessage("error", errorMessage);

		const shouldShow =
			!this.filteredMessages.includes(errorMessage) &&
			!this.messages.some((i) => i.message === errorMessage) &&
			!this.messagesFilter.some((i) => errorMessage.includes(i));

		if (!shouldShow) return null;

		this.messages.push({
			message: errorMessage,
			expiresIn: Date.now() + this.debounce,
		});

		return ToastService.showMessage("error", errorMessage);
	};
}

export const errorHandler = new ErrorHandler();

export interface ErrorResponseType {
	error: string;
}

export default function errorHandling(error: AxiosError<ErrorResponseType>, forceShow: boolean = false) {

	let message = error.response?.data?.error || error.message;

	if (message) errorHandler.handleError(message, forceShow);
}
