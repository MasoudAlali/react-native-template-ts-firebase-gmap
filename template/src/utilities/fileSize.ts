export const convertSizeFile = (fileSize: number, decimals: number = 2) => {
    if (fileSize === 0) return "0 B";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(fileSize) / Math.log(k));
    return `${parseFloat((fileSize / k ** i).toFixed(dm))}${sizes[i]}`;
};
