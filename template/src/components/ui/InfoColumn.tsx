import React, { memo } from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { Colors, FontSizes, FontWeights, Margins } from "../../config/ui";

interface Props {
	title: string;
	description: string;
	rightAlign?: boolean;
	reverse?: boolean;
	style?: StyleProp<ViewStyle>;
}

const InfoColumn = ({ title, description, rightAlign = false, reverse = false, style }: Props) => {
	if (reverse) {
		return (
			<View style={[ rightAlign ? styles.detailContainerRight : styles.detailContainer, style ]}>
				<Text style={styles.detailTitle}>{title}</Text>
				<Text style={styles.detailDescription}>{description}</Text>
			</View>
		);
	} else {
		return (
			<View style={[ rightAlign ? styles.detailContainerRight : styles.detailContainer, style ]}>
				<Text style={styles.detailDescription}>{description}</Text>
				<Text style={styles.detailTitle}>{title}</Text>
			</View>
		);
	}
};

const styles = StyleSheet.create({
	detailContainer: {
		alignItems: "flex-start",
		marginRight: Margins.normal,
	},
	detailContainerRight: {
		alignItems: "flex-end",
		marginLeft: Margins.normal
	},
	detailTitle: {
		fontSize: FontSizes.smaller,
		fontWeight: FontWeights.semiBold,
		marginTop: Margins.smallest,
		color: Colors.text
	},
	detailDescription: {
		fontSize: FontSizes.smallest,
		color: Colors.text_200,
	},
});

export default memo(InfoColumn);
