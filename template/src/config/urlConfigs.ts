export const baseApiUrl =
	process.env.NODE_ENV === "development" ? "https://maham-api.hectora.app" : "https://maham-api.hectora.app";

export const apiEndpoints = {
	auth: {
		getCaptcha: "",
		login: "",
		logout: "",
		register: "",
		refreshToken: ""
	},
	user: {
		profile: "",
	},
};
