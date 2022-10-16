export const Colors = {
    white: "#FFFFFF",
    black: "#000000",
    text: "#141432",
    text_100: "#B0BEC5",
    text_200: "#78909C",
    primary: "#0064AA",
    primary_200: "#66A2CC",
    primary_100: "#D9E8F3",
    success: "#009673",
    success_text: "#0B512B",
    into: "#74C9FF",
    info_text: "#0B3D5C",
    border: "#CFD8DC",
    border_100: "#EEEEEE",
    disabled: "#B0BEC5",
    error: "#E11900",
    warning: "#FFC043",
    core: "#FFFFFF",
    core_100: "#F7F9FA",
    core_200: "#EEEEEE",
};

export const FontSizes = {
    smallest: 10,
    smaller: 12,
    normal: 14,
    medium: 16,
    big: 18,
    bigger: 20
};

export const LineHeights = {
    smallest: 14,
    smaller: 16,
    semiSmall: 20,
    normal: 24
};

export const FontWeights: Record<string, "normal" | "bold" | "100" | "200" | "300" | "400" | "500" | "600" | "700" | "800" | "900"> = {
    normal: "400",
    semiBold: "500",
    bold: "700",
};

export const Paddings = {
    mostSmallest: 2,
    smallest: 4,
    semiSmall: 8,
    small: 12,
    normal: 14,
    medium: 16,
    page: 16,
    big: 32,
    bigger: 64,
};

export const Margins = {
    noMargin: 0,
    smallest: 4,
    smaller: 8,
    semiSmall: 10,
    normal: 16,
    semiBig: 20,
    big: 32,
    semiBigger: 48,
    bigger: 64,
};

export const Borders = {
    normal: 5,
    max: 10000,
};

export const HitSlop = {
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
};

export const ActiveOpacity = 0.6;

export const IconSizes = {
    small: 18,
    normal: 24,
};

export const KeyExtractor = (item: any) => item.id;
