import React from "react";
import MiIcon from "react-native-vector-icons/MaterialIcons";
import FaIcon from "react-native-vector-icons/FontAwesome";
import MdiIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, IconSizes } from "../../config/ui";
import { StyleProp, ViewStyle } from "react-native";

export type IconFamilies = "mdi" | "fa" | "mi";

interface Props {
	family?: IconFamilies;
	size?: number;
	name: string;
	color?: string;
	style?: StyleProp<ViewStyle>;
}

const Icon = ({ size = IconSizes.small, name, color = Colors.black, family = "mdi", style }: Props) => {
	const IC = family === "mi" ? MiIcon : family === "fa" ? FaIcon : MdiIcon;

	return <IC size={size} name={name} color={color} style={style}/>;
};

export default Icon;
