import axios, { AxiosError, AxiosPromise, AxiosRequestConfig, AxiosResponse, AxiosResponseHeaders } from "axios";
import { baseApiUrl } from "../config/urlConfigs";
import EventEmitter from "./eventEmitter";
import AuthRequests from "../api/authRequests";
import AuthService from "./authService";
import CacheService from "./cacheService";
import Logger, { LogKeys } from "./logger";
import ErrorHandler, { ErrorResponseType } from "./errorHandler";

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
				new Promise((resolve) =>
					resolve({
						__cached: true,
						data: cachedValue,
						status: 200,
						statusText: "OK",
						headers: request.headers as AxiosResponseHeaders,
						config,
						request,
					}),
				) as AxiosPromise<any>;
		}
	}
	const isLoggedIn = AuthService.isUserLoggedIn();
	const token = AuthService.getToken();

	request.headers = {
		Authorization: isLoggedIn ? `Bearer ${token}` : false,
		...(request.headers || {}),
	};
	return request;
});

axiosInstance.interceptors.response.use(
	(response: AxiosResponse) => {
		if (response.config?.shouldCache && !response?.config?.__cached) {
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
		const isLoggedIn = AuthService.isUserLoggedIn();
		const token = AuthService.getToken();
		const refreshToken = AuthService.getRefreshToken();

		Logger.error(
			LogKeys.API,
			`${error.response?.config?.method} ${error.response?.config?.url} ->`,
			error,
			error.response?.data,
			isLoggedIn,
			token,
			refreshToken,
			error?.response?.status,
		);

		if (error?.response?.status === 422 || error?.response?.status === 500) {
			if (error?.config?.url?.includes("oauth/token")) {
				return AuthService.logoutUser();
			}
			if (error?.response?.status === 422 && isLoggedIn && token && refreshToken) {
				await AuthRequests.refreshToken();
				if (error?.config?.headers?.Authorization) {
					error.config.headers.Authorization = `Bearer ${AuthService.getToken()}`;
				}
				return axiosInstance.request(error?.config);
			}
		}
		if (error?.response?.status !== 401) {
			ErrorHandler.handleError(
				error as AxiosError<ErrorResponseType>,
				[ "post", "delete", "patch" ].includes(error?.config?.method || "get"),
			);
		}
		// @ts-ignore
		if (error?.response?.status !== 200 && error?.response?.data?.errorReason === "invalid token") {
			AuthService.logoutUser();
		}
		if (error?.response?.status === 401 && !error?.config?.url?.includes("oauth/token")) {
			if (error.response?.config?.headers?.Authorization) {
				AuthService.logoutUser();
			}
			EventEmitter.emit("CloseEverything");
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
