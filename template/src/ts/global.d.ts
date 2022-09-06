export type Nullable<T> = T | null | undefined;

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
		}
	}
}

export interface Console {
	error(message?: any, ...optionalParams: any[]): void;

	info(message?: any, ...optionalParams: any[]): void;

	log(message?: any, ...optionalParams: any[]): void;

	warn(message?: any, ...optionalParams: any[]): void;

	trace(message?: any, ...optionalParams: any[]): void;

	debug(message?: any, ...optionalParams: any[]): void;

	table(...data: any[]): void;

	groupCollapsed(label?: string): void;

	groupEnd(): void;

	group(label?: string): void;

	/**
	 * @deprecated Use LogBox.ignoreLogs(patterns) instead
	 */
	ignoredYellowBox: string[];
}

declare module "axios" {
	interface AxiosRequestConfig {
		shouldCache?: boolean;
		cacheTTL?: number;
		__cached?: boolean;
	}

	interface AxiosResponse {
		__cached?: boolean;
	}
}

interface StringDictValue<X> {
	[key: string]: X;
}

interface NumericDictValue<X> {
	[key: number]: X;
}

interface PaginationResult<X> {
	totalItems: number;
	totalPages: number;
	pageSize: number;
	page: number;
	items: X[];
}
