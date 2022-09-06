import React, { memo, ReactNode } from "react";
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import {
	ActiveOpacity,
	Colors,
	FontSizes,
	FontWeights,
	HitSlop,
	IconSizes,
	LineHeights,
	Paddings,
} from "../../config/ui";
import Icon from "../ui/Icon";
import Loading from "../ui/Loading";
import { navigateBack } from "../../navigators/Root";

interface Props {
	title: string;
	extraInfo?: string;
	LeftComponent?: ReactNode | ReactNode[];
	CenterComponent?: ReactNode | ReactNode[];
	hasBackButton?: boolean;
	RightComponent?: ReactNode | ReactNode[];
	loading?: boolean;
	onTitlePress?: ((event: GestureResponderEvent) => void) | undefined;
	style?: ViewStyle;
}

const Header = ({
	title = "",
	hasBackButton = true,
	RightComponent = null,
	CenterComponent = null,
	LeftComponent = null,
	extraInfo,
	loading = false,
	onTitlePress,
	style,
}: Props) => {
	return (
		<View style={[ styles.container, style ]}>
			{LeftComponent ? (
				LeftComponent
			) : hasBackButton ? (
				<TouchableOpacity hitSlop={HitSlop} activeOpacity={ActiveOpacity} onPress={navigateBack}>
					<Icon name={"chevron-left"} family={"mi"} size={IconSizes.normal}/>
				</TouchableOpacity>
			) : (
				<View/>
			)}
			{CenterComponent ? (
				CenterComponent
			) : (
				<TouchableOpacity
					activeOpacity={ActiveOpacity}
					hitSlop={HitSlop}
					onPress={onTitlePress}
					disabled={!onTitlePress}
					style={styles.titleContainer}>
					<Text numberOfLines={1} style={styles.title}>
						{title}
					</Text>
					{extraInfo ? (
						<Text numberOfLines={1} style={styles.extraTitle}>
							{extraInfo}
						</Text>
					) : null}
				</TouchableOpacity>
			)}
			{RightComponent ? RightComponent : <View/>}
			{loading ? <Loading type={"bar"} containerStyle={styles.loading} size={1}/> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingVertical: Paddings.semiSmall,
		paddingHorizontal: Paddings.normal,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: Colors.white,
		borderBottomWidth: 1,
		borderBottomColor: Colors.border,
		position: "relative",
	},
	titleContainer: {
		flex: 1,
		maxWidth: "60%",
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "column",
	},
	title: {
		fontSize: FontSizes.medium,
		fontWeight: FontWeights.bold,
		maxWidth: "100%",
		color: Colors.text,
	},
	extraTitle: {
		fontSize: FontSizes.smaller,
		lineHeight: LineHeights.smaller,
		fontWeight: FontWeights.semiBold,
		color: Colors.text_100,
	},
	loading: {
		position: "absolute",
		bottom: 0,
		left: -Paddings.normal,
		right: -Paddings.normal,
		padding: 0,
		flexDirection: "row",
	},
});

export default memo(Header);
