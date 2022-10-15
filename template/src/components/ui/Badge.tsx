import React, {memo} from "react";
import {StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Borders, Colors, FontSizes, FontWeights, Paddings} from "~/config/ui";

interface Props {
    label: string;
    type?: "primary" | "secondary";
    style?: StyleProp<ViewStyle>;
    onPress?: Function;
}

const Badge = ({label, type = "primary", style}: Props) => {
    const _containerStyle = [styles.container, type === "primary" ? styles.primary : styles.secondary, style];
    const _labelStyle = [styles.label, type === "primary" ? styles.primaryLabel : styles.secondaryLabel];
    return (
        <View style={_containerStyle}>
            <Text style={_labelStyle} numberOfLines={1}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: Paddings.smallest,
        paddingHorizontal: Paddings.semiSmall,
        borderRadius: Borders.max,
        borderWidth: 1,
    },
    primary: {
        borderColor: Colors.primary,
        backgroundColor: Colors.primary
    },
    secondary: {
        borderColor: Colors.text_200,
    },
    label: {
        fontSize: FontSizes.smaller,
        fontWeight: FontWeights.semiBold
    },
    primaryLabel: {
        color: Colors.white
    },
    secondaryLabel: {
        color: Colors.text_200
    }
});

export default memo(Badge);
