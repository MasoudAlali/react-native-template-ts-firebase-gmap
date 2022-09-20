export const baseApiUrl =
	process.env.NODE_ENV === "development" ? "" : "";

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
