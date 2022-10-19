import StorageService from "./storageService";
import qs from "qs";
import Logger, {LogKeys} from "./logger";
import {Minute} from "~/constants";

class CacheService {
    private _data: Nullable<Record<string, any>> = null;

    constructor() {
        this._init();
    }

    async save(key: string, content: any, expireIn: number = 5 * Minute) {
        Logger.log(LogKeys.Cache, "Saving ", key, expireIn);

        if (!this._data) await this._init();
        if (!this._data) return;

        this._data[key] = {
            content,
            expireTime: Date.now() + expireIn * 1000,
        };
        this._persist();
    }

    async get(key: string) {
        if (!this._data) await this._init();

        const d = this._data?.[key];

        Logger.log(LogKeys.Cache, "Reading", key, !!d && d.expireTime >= Date.now());

        if (!d) return null;

        if (d.expireTime < Date.now()) {
            delete this._data?.[key];
            this._persist();
            return null;
        }

        return d.content;
    }

    getCacheKeyFromUrl(url: string, params: object = {}) {
        return `${url}?${qs.stringify(params)}`;
    }

    async remove(key: string) {
        delete this._data?.[key];
        return this._persist();
    }

    clear() {
        this._data = {};
        this._persist();
    }

    private async _init() {
        const d = await StorageService.getItem("@cache", {});
        this._data = d || {};
    }

    private _persist() {
        StorageService.setItem("@cache", this._data);
    }
}

export default new CacheService();
