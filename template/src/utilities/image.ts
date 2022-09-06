type ImageTypes = "jpeg" | "jpg" | "png";
export const getBase64ImageUrl = (type: ImageTypes, content: string) => {
	return `data:image/${type};base64, ${content}`;
};

export const getBase64FileUrl = (type: string, content: string) => {
	return `data:${type};base64, ${content}`;
};
