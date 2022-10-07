import axios, {AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders} from "axios";
import {baseApiUrl} from "../config/urlConfigs";
import CacheService from "./cacheService";
import Logger, {LogKeys} from "./logger";
import ErrorHandler, {ErrorResponseType} from "./errorHandler";

const axiosInstance = axios.create({
    baseURL: baseApiUrl,
});

axiosInstance.interceptors.request.use(async (request: AxiosRequestConfig) => {
    if (request.method === "get") {
        const cacheKey = CacheService.getCacheKeyFromUrl(request.url || "", request?.params);
        const cachedValue = await CacheService.get(cacheKey);

        if (cachedValue) {
            Logger.log(LogKeys.Cache, "Returning from cache");
            request.adapter = (config) =>
                new Promise((resolve) => resolve({
                    __cached: true,
                    data: cachedValue,
                    status: 200,
                    statusText: "OK",
                    headers: request.headers as AxiosResponseHeaders,
                    config,
                    request,
                }),
                ) as AxiosPromise;
        }
    }
    
    // You can handle Authentication here
    request.headers = {
        ...(request.headers || {}),
    };
    return request;
});

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response.config?.shouldCache && !response?.config?.__cached && response.status === 200) {
            const cacheKey = CacheService.getCacheKeyFromUrl(response.config.url || "", response?.config?.params);
            CacheService.save(cacheKey, response.data, response.config?.cacheTTL);
        }
        return {
            data: response.data,
            success: response.data?.success,
            status: response.status,
        };
    },
    async (error: AxiosError) => {

        Logger.error(
            LogKeys.API,
            `${error.response?.config?.method} ${error.response?.config?.url} ->`,
            error,
            error.response?.data,
            error?.response?.status,
        );

        if (error?.response?.status !== 401) {
            ErrorHandler.handleError(
                error as AxiosError<ErrorResponseType>,
                ["post", "delete", "patch"].includes(error?.config?.method || "get"),
            );
        }
        throw error;
    },
);

const _get = axiosInstance.get;

axiosInstance.get = <T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
): Promise<R> => {
    return new Promise((resolve) =>
        requestAnimationFrame(() => {
            resolve(_get(url, config));
        }),
    );
};

export default axiosInstance;
