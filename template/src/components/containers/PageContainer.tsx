import React, { memo, PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ScrollView as RGScrollView } from "react-native-gesture-handler";
import { Colors, Paddings } from "../../config/ui";

interface Props extends PropsWithChildren {
	Container?: typeof View | typeof ScrollView | typeof RGScrollView;
	containerProps?: object;
}

const PageContainer = ({ children, Container = View, containerProps = {} }: Props) => {
	return (
		<Container style={styles.container} {...containerProps}>
			{children}
		</Container>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: Paddings.page,
		backgroundColor: Colors.white,
	},
});

export default memo(PageContainer);
