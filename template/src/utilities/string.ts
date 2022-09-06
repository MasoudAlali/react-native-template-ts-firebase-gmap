export const camelize = (str: string) => {
	return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
		return chr.toUpperCase();
	});
};

export const camelizeArray = (arr: string[] = [], separator = "") => {
	return arr.map((i) => `${i?.[0].toUpperCase()}${i?.slice(1)}`).join(separator);
};

export const baseFormatPrice = (price: number) => {
	return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
