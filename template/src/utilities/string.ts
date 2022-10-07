export const camelize = (str: string) => {
    return (" " + str).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (match, chr) {
        return chr.toUpperCase();
    });
};

export const baseFormatPrice = (price: number) => {
    return price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
};
