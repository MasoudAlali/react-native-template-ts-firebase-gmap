import "axios";

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
