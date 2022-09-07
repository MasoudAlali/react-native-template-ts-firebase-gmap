import { StringDictValue } from "../ts/global";
import Logger, { LogKeys } from "./logger";

class EventEmitter {
	Events = {
		General: {
			ShowModal: () => "general-show-modal",
			HideModal: () => "general-hide-modal",
		},
	};

	#events: StringDictValue<Function[]> = {};

	addListener = (eventName: string, handler: Function) => {
		const { [eventName]: queue } = this.#events;
		const arr = queue || [];
		arr.push(handler);
		this.#events[eventName] = arr;

		return this.removeListener.bind(this, eventName, handler);
	};

	removeListener = (eventName: string, handler: Function) => {
		const { [eventName]: queue } = this.#events;
		const arr = queue || [];
		arr.splice(arr.indexOf(handler), 1);
	};

	emit = (eventName: string, payload?: any) => {
		const { [eventName]: queue } = this.#events;

		(queue || []).map((i: Function) => {
			try {
				if (i) {
					requestAnimationFrame(() => i(payload, eventName));
				}
			} catch (error) {
				Logger.error(LogKeys.Error, error);
			}
		});
	};
}

export default new EventEmitter();
