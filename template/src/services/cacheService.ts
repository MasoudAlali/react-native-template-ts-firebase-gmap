import StorageService from "./storageService";
import qs from "qs";
import { Nullable, StringDictValue } from "../ts/global";
import Logger, { LogKeys } from "./logger";

class CacheService {
	#data: Nullable<StringDictValue<any>> = null;

	constructor() {
		this.#init();
	}

	async #init() {
		const d = await StorageService.get("@cache", {});
		this.#data = d || {};
	}

	async save(key: string, content: any, expireIn: number = 5 * 60) {
		Logger.log(LogKeys.Cache, "Saving ", key, expireIn);

		if (!this.#data) await this.#init();
		if (!this.#data) return;

		this.#data[key] = {
			content,
			expireTime: Date.now() + expireIn * 1000,
		};
		this.#persist();
	}

	async get(key: string) {
		if (!this.#data) await this.#init();

		const d = this.#data?.[key];

		Logger.log(LogKeys.Cache, "Reading", key, !!d && d.expireTime >= Date.now());

		if (!d) return null;

		if (d.expireTime < Date.now()) {
			delete this.#data?.[key];
			this.#persist();
			return null;
		}

		return d.content;
	}

	getCacheKeyFromUrl(url: string, params: object = {}) {
		return `${url}?${qs.stringify(params)}`;
	}

	#persist() {
		StorageService.set("@cache", this.#data);
	}

	remove(key: string) {
		delete this.#data?.[key];
		return this.#persist();
	}

	clear() {
		this.#data = {};
		this.#persist();
	}
}

export default new CacheService();
