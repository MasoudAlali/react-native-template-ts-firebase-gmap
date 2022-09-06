import { StringDictValue } from "../ts/global";

class EventEmitter {
	Events = {
		General: {
			ShowModal: () => "general-show-modal",
			HideModal: () => "general-hide-modal",
		},
	};

	private readonly events: StringDictValue<Function[]>;

	constructor() {
		this.events = {};
	}

	addListener = (eventName: string, handler: Function) => {
		const { [eventName]: queue } = this.events;
		const arr = queue || [];
		arr.push(handler);
		this.events[eventName] = arr;

		return this.removeListener.bind(this, eventName, handler);
	};

	removeListener = (eventName: string, handler: Function) => {
		const { [eventName]: queue } = this.events;
		const arr = queue || [];
		arr.splice(arr.indexOf(handler), 1);
	};

	emit = (eventName: string, payload?: any) => {
		const { [eventName]: queue } = this.events;

		(queue || []).map((i) => {
			try {
				if (i) {
					requestAnimationFrame(() => i(payload, eventName));
				}
			} catch (error) {
				console.warn("EventEmitter", error);
			}
		});
	};
}

export default new EventEmitter();
