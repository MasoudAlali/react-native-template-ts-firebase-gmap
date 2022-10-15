import React, {memo} from "react";
import {StyleSheet, Text, TouchableOpacity, TouchableOpacityProps} from "react-native";
import {ActiveOpacity, Borders, Colors, FontSizes, Margins, Paddings} from "~/config/ui";
import Loading from "./Loading";

export type ButtonType = "primary" | "secondary";

interface Props extends TouchableOpacityProps {
    label: string;
    loading?: boolean;
    type?: ButtonType;
}

const Button = ({label, style, type = "primary", disabled, loading = false, ...rest}: Props) => {
    const _style = type === "primary" ? styles.primaryButton : type === "secondary" ? styles.secondaryButton : null;
    const _buttonStyle = type === "primary" ? styles.primaryText : type === "secondary" ? styles.secondaryText : null;
    return <TouchableOpacity
        activeOpacity={ActiveOpacity}
        style={[styles.button, _style, disabled || loading ? styles.disabled : null, style]}
        disabled={disabled || loading}
        {...rest}
    >
        <Text style={[styles.text, _buttonStyle]}>{label}</Text>
        {loading ? <Loading size={16} containerStyle={styles.loading}/> : null}
    </TouchableOpacity>;
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
        paddingVertical: Paddings.small,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: Borders.normal,
        flexDirection: "row",
        paddingHorizontal: Paddings.medium
    },
    primaryButton: {
        backgroundColor: Colors.primary
    },
    secondaryButton: {
        backgroundColor: Colors.primary_100
    },
    disabled: {
        backgroundColor: Colors.disabled
    },
    text: {
        color: Colors.white,
        fontSize: FontSizes.medium
    },
    primaryText: {
        color: Colors.white
    },
    secondaryText: {
        color: Colors.primary
    },
    loading: {
        marginLeft: Margins.smaller
    }
});

export default memo(Button);
