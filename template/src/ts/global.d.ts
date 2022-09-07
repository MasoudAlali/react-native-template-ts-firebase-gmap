type Nullable<T> = T | null | undefined;

type StringDictValue<X> = Record<string, X>;

type NumericDictValue<X> = Record<number, X>;

declare global {
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: "development" | "production";
		}
	}
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
