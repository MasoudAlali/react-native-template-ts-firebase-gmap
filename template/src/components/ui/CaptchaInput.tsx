import React, { useEffect, useRef, useState } from "react";
import { Image, StyleProp, StyleSheet, TextInputProps, TouchableOpacity, View, ViewStyle } from "react-native";
import TextInput from "./TextInput";
import { Nullable } from "../../ts/global";
import Icon from "./Icon";
import { Borders, Colors, HitSlop, Margins } from "../../config/ui";
import Loading from "./Loading";
import AuthRequests from "../../api/authRequests";
import { getBase64ImageUrl } from "../../utilities/image";

interface Props extends TextInputProps {
	containerStyle: StyleProp<ViewStyle>;
	onToken: Function;
}

const CaptchaInput = ({ style, containerStyle, onToken, ...rest }: Props) => {
	const [ captchaUrl, setCaptchaUrl ] = useState<Nullable<string>>(null);
	const refreshTimer = useRef<any>();

	const getCaptcha = async () => {
		setCaptchaUrl(null);
		const {
			data: {
				data: { captcha, token },
			},
		} = await AuthRequests.getCaptcha();
		if (captcha) {
			setCaptchaUrl(getBase64ImageUrl("png", captcha));
			onToken(token);
		}
	};

	useEffect(() => {
		getCaptcha();
		if (refreshTimer.current) clearInterval(refreshTimer.current);
		refreshTimer.current = setInterval(getCaptcha, 30000);
		return () => {
			clearInterval(refreshTimer.current);
		};
	}, []);

	return (
		<View style={[ styles.container, containerStyle ]}>
			<TextInput {...rest} style={styles.input} autoCorrect={false}/>
			<TouchableOpacity activeOpacity={1} hitSlop={HitSlop} onPress={getCaptcha} style={styles.icon}>
				<Icon name={"refresh"} size={24} color={Colors.blue_300}/>
			</TouchableOpacity>
			{captchaUrl ? (
				<Image source={{ uri: captchaUrl }} style={styles.image}/>
			) : (
				<Loading containerStyle={styles.image} size={24}/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: Borders.normal,
		borderColor: Colors.border,
		borderWidth: 1,
	},
	icon: {
		marginHorizontal: Margins.smaller,
	},
	input: {
		flex: 3,
		borderWidth: 0,
	},
	image: {
		height: 24,
		aspectRatio: 2.75,
		marginRight: Margins.smaller,
		justifyContent: "center",
		alignItems: "center",
	},
});

export default CaptchaInput;
