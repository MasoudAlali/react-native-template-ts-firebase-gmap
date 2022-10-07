import React from "react";
import {
    Platform,
    StyleProp,
    StyleSheet,
    Text,
    TextInput as RNTI,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle
} from "react-native";
import { Borders, Colors, FontSizes, FontWeights, Margins, Paddings } from "../../config/ui";
import Icon, { IconFamilies } from "./Icon";

interface Props extends TextInputProps {
	label?: string;
	containerStyle?: StyleProp<ViewStyle>;
	labelStyle?: StyleProp<TextStyle>;
	disabled?: boolean;
	iconName?: string;
	iconFamily?: IconFamilies;
	iconSize?: number;
	iconColor?: string;
}

const TextInput = ({
    label,
    containerStyle,
    labelStyle,
    disabled = false,
    autoCapitalize = "none",
    style,
    iconSize,
    iconName,
    iconColor,
    iconFamily,
    ...rest
}: Props) => {
    return (
        <View style={[ styles.container, containerStyle ]}>
            {label ? <Text style={[ styles.label as TextStyle, labelStyle ]}>{label}</Text> : null}
            <View style={iconName ? styles.insideContainerIcon : styles.insideContainer}>
                {iconName ? (
                    <Icon
                        name={iconName}
                        family={iconFamily || "mi"}
                        size={iconSize || 18}
                        color={iconColor || Colors.text_100}
                        style={styles.icon}
                    />
                ) : null}
                <RNTI
                    editable={!disabled}
                    style={[ iconName ? styles.iconInput : styles.input, style ]}
                    autoCapitalize={autoCapitalize}
                    {...rest}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    insideContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
    },
    insideContainerIcon: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: Borders.normal,
        borderWidth: 1,
        borderColor: Colors.border,
        paddingHorizontal: Paddings.semiSmall,
    },
    input: {
        borderRadius: Borders.normal,
        borderWidth: 1,
        borderColor: Colors.border,
        padding: Platform.OS === "android" ? Paddings.semiSmall : Paddings.medium,
        color: Colors.text,
        flex: 1,
    },
    label: {
        marginBottom: Margins.smaller,
        fontSize: FontSizes.normal,
        color: Colors.text,
        fontWeight: FontWeights.semiBold,
    },
    iconInput: {
        padding: Paddings.semiSmall,
        color: Colors.text,
        flex: 1,
    },
    icon: {
        marginRight: Margins.smallest,
    },
});

export default TextInput;
