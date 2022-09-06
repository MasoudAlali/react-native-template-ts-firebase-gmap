import { StringDictValue } from "../ts/global";
import crashlytics from "@react-native-firebase/crashlytics";

type LogTypes = "API" | "CACHE" | "COMPONENT" | "ERROR" | "OTHER";

export const LogKeys: {
	API: LogTypes;
	Cache: LogTypes;
	Component: LogTypes;
	Other: LogTypes;
	Error: LogTypes;
} = {
	API: "API",
	Cache: "CACHE",
	Component: "COMPONENT",
	Other: "OTHER",
	Error: "ERROR",
};

class Logger {
	private _console: typeof global.console;

	constructor() {
		this._console = console;
	}

	hiddenLogs: StringDictValue<boolean> = {
		[LogKeys.API]: true,
		[LogKeys.Error]: true,
		[LogKeys.Other]: true,
		[LogKeys.Cache]: true,
		[LogKeys.Component]: true,
	};

	log(key: LogTypes, ...messages: any) {
		if (this.hiddenLogs[key]) return;

		this._console.log(key, ...messages);
	}

	warn(key: LogTypes, ...messages: any) {
		if (this.hiddenLogs[key]) return;

		this._console.warn(key, ...messages);
	}

	info(key: LogTypes, ...messages: any) {
		if (this.hiddenLogs[key]) return;

		this._console.info(key, ...messages);
	}

	error(key: LogTypes, ...messages: any) {
		if (this.hiddenLogs[key]) return;

		this._console.error(key, ...messages);

		(messages || []).map((i: any) => {
			if (i instanceof Error) {
				crashlytics().recordError(i);
			}
		});
	}

	assert(value?: any, ...messages: any) {
		this._console.assert(value, ...messages);
	}

	trace(key: LogTypes, ...messages: any) {
		if (this.hiddenLogs[key]) return;

		this._console.trace(key, ...messages);
	}

	debug(key: LogTypes, ...messages: any) {
		if (this.hiddenLogs[key]) return;

		this._console.debug(key, ...messages);
	}

	clear() {
		this._console.clear();
	}

	table(...data: any[]) {
		this._console.table(...data);
	}

	groupCollapsed(label?: string) {
		this._console.groupCollapsed(label);
	}

	groupEnd() {
		this._console.groupEnd();
	}

	group(label?: string) {
		this._console.group(label);
	}
}

export default new Logger();
