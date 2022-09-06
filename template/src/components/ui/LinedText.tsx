import React from "react";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors, FontSizes, LineHeights, Margins } from "../../config/ui";

interface Props {
	direction: "center" | "right" | "left";
	color?: string;
	lineColor?: string;
	hasLine?: boolean;
	containerStyle?: ViewStyle;
	label: string;
	labelStyle?: ViewStyle;
	onLabelPress?: any;
}

const LinedText = ({
	direction,
	color = Colors.text_200,
	lineColor = Colors.border,
	hasLine,
	containerStyle,
	labelStyle,
	label,
	onLabelPress,
}: Props) => {
	const lineStyles = [
		styles.line,
		{
			backgroundColor: lineColor || color
		} ];
	return (
		<View style={[ styles.container, containerStyle ]}>
			{hasLine && [ "center", "right" ].includes(direction) ? <View style={lineStyles}/> : null}
			<Text
				style={[
					styles.label,
					labelStyle,
					{
						color,
						marginRight: direction === "right" ? 0 : Margins.smaller,
						marginLeft: direction === "left" ? 0 : Margins.smaller
					},
				]}
				onPress={onLabelPress}>
				{label}
			</Text>
			{hasLine && [ "center", "left" ].includes(direction) ? <View style={lineStyles}/> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginTop: Margins.smallest,
		marginBottom: Margins.normal
	},
	label: {
		fontSize: FontSizes.smaller,
		lineHeight: LineHeights.smaller,
	},
	line: {
		flex: 1,
		height: 1,
	}
});

export default LinedText;
