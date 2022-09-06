import React, { memo, ReactNode } from "react";
import { GestureResponderEvent, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { ActiveOpacity, Borders, Colors, FontSizes, FontWeights, HitSlop, Margins, Paddings } from "../../config/ui";

export interface InfoRowProps {
	title: string;
	value: string | number;
	type: "Info";
	rowNumber?: string | number;
	hasParent?: boolean;
	linkTitle?: string;
	linkOnPress?: (e: GestureResponderEvent) => void;
}

export interface HeaderRowProps {
	title: string;
	type: "Heading";
	rows?: InfoRowProps[];
	isGrayed?: boolean;
}

export type InfoRowsType = Array<HeaderRowProps | InfoRowProps>;

interface Props {
	title?: string;
	cardNumber?: string | number;
	HeadComponent?: ReactNode | ReactNode[];
	information: InfoRowsType;
	style?: StyleProp<ViewStyle>;
	pps?: string;
}

const InfoRow = ({ title, value, rowNumber, hasParent, linkTitle, linkOnPress }: InfoRowProps) => {
	return (
		<View style={styles.rowContainer}>
			<View style={styles.titleContainer}>
				{rowNumber ? (
					<View style={styles.rowNumberContainer}>
						<Text style={styles.rowNumber}>{rowNumber}</Text>
					</View>
				) : hasParent ? (
					<View style={styles.paddingContainer}/>
				) : null}
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={styles.valueContainer}>
				<Text style={styles.value}>{value}</Text>
				{linkTitle && linkOnPress ? (
					<TouchableOpacity
						activeOpacity={ActiveOpacity}
						onPress={linkOnPress}
						hitSlop={HitSlop}
						style={styles.linkContainer}>
						<Text style={styles.link}>{linkTitle}</Text>
					</TouchableOpacity>
				) : null}
			</View>
		</View>
	);
};

const HeaderRow = ({ rows = [], title, isGrayed = false }: HeaderRowProps) => {
	return (
		<View style={styles.headerRowContainer}>
			<Text style={styles.header}>{title}</Text>
			<View style={isGrayed ? styles.headerRowBoxGray : styles.headerRowBox}>
				{rows?.map((i: InfoRowProps, _) => (
					<InfoRow
						title={i.title}
						value={i.value}
						type={i.type}
						hasParent={i.hasParent}
						rowNumber={i.rowNumber}
						linkTitle={i.linkTitle}
						linkOnPress={i.linkOnPress}
						key={_}
					/>
				))}
			</View>
		</View>
	);
};

const InfoRowsCard = ({ information, style, pps, title, cardNumber, HeadComponent }: Props) => {
	return (
		<View style={[ styles.container, style ]}>
			{title || cardNumber ? (
				<View style={styles.headingContainer}>
					{cardNumber ? (
						<View style={styles.cardNumberContainer}>
							<Text style={styles.cardNumber}>{cardNumber}</Text>
						</View>
					) : null}
					{title ? <Text style={styles.heading}>{title}</Text> : null}
				</View>
			) : null}
			{HeadComponent}
			{information.map((i, _) =>
				i.type === "Info" ? (
					<InfoRow
						title={i.title}
						value={i.value}
						type={i.type}
						rowNumber={i.rowNumber}
						hasParent={i.hasParent}
						linkTitle={i.linkTitle}
						linkOnPress={i.linkOnPress}
						key={_}
					/>
				) : (
					<HeaderRow title={i.title} type={i.type} rows={i.rows} isGrayed={i.isGrayed} key={_}/>
				),
			)}
			{pps ? <Text style={styles.pps}>{pps}</Text> : null}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		borderColor: Colors.border_100,
		borderWidth: 1,
		borderRadius: Borders.normal,
		padding: Paddings.semiSmall,
	},
	headerRowContainer: {},
	header: {
		fontWeight: FontWeights.semiBold,
		color: Colors.text,
		marginBottom: Margins.smaller,
		marginTop: Margins.smaller,
		fontSize: FontSizes.normal,
	},
	headerRowBoxGray: {
		padding: Paddings.semiSmall,
		backgroundColor: Colors.core_100,
		borderRadius: Borders.normal,
		marginBottom: Margins.smaller,
	},
	headerRowBox: {
		padding: Paddings.semiSmall,
		marginBottom: Margins.smaller,
	},
	rowContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
		marginBottom: Margins.smaller,
		flexWrap: "wrap",
	},
	title: {
		color: Colors.text_200,
		fontSize: FontSizes.normal,
		marginTop: Margins.smaller,
	},
	value: {
		color: Colors.text,
		fontWeight: FontWeights.semiBold,
		fontSize: FontSizes.normal,
		marginTop: Margins.smaller
	},
	linkContainer: {
		marginLeft: Margins.smaller,
	},
	link: {
		color: Colors.blue_300,
		fontSize: FontSizes.normal,
		fontWeight: FontWeights.semiBold,
	},
	valueContainer: {
		flexDirection: "row",
		justifyContent: "flex-end",
	},
	titleContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
	},
	pps: {
		color: Colors.text_200,
		marginTop: Margins.normal,
	},
	headingContainer: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		marginBottom: Margins.normal,
		marginTop: Margins.smaller,
	},
	heading: {
		fontSize: FontSizes.normal,
		fontWeight: FontWeights.bold,
		color: Colors.primary
	},
	cardNumberContainer: {
		borderRadius: Borders.max,
		aspectRatio: 1,
		height: 24,
		backgroundColor: Colors.blue_100,
		justifyContent: "center",
		alignItems: "center",
		marginRight: Margins.smaller,
	},
	cardNumber: {
		fontSize: FontSizes.normal,
		color: Colors.blue_300,
		fontWeight: FontWeights.bold,
	},
	rowNumberContainer: {
		aspectRatio: 1,
		height: 18,
		borderWidth: 1,
		borderColor: Colors.border,
		borderRadius: Borders.max,
		backgroundColor: Colors.blue_100,
		justifyContent: "center",
		alignItems: "center",
		marginRight: Margins.smallest,
	},
	rowNumber: {
		color: Colors.text_200,
		fontSize: FontSizes.smaller,
		fontWeight: FontWeights.semiBold,
	},
	paddingContainer: {
		width: 18,
		marginRight: Margins.smallest,
	},
});

export default memo(InfoRowsCard);
