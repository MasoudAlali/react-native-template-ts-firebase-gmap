import React, {memo} from "react";
import {GestureResponderEvent, StyleProp, StyleSheet, Text, View, ViewStyle} from "react-native";
import {Colors, FontSizes, LineHeights, Margins} from "~/config/ui";

interface Props {
    alignment: "center" | "right" | "left";
    color?: string;
    lineColor?: string;
    hasLine?: boolean;
    containerStyle?: StyleProp<ViewStyle>;
    label: string;
    labelStyle?: StyleProp<ViewStyle>;
    onLabelPress?: ((event: GestureResponderEvent) => void);
}

const LinedText = ({
    alignment,
    color = Colors.text_200,
    lineColor = Colors.border,
    hasLine = false,
    containerStyle,
    labelStyle,
    label,
    onLabelPress,
}: Props) => {
    const lineStyles = [
        styles.line,
        {
            backgroundColor: lineColor || color
        }];
    return (
        <View style={[styles.container, containerStyle]}>
            {hasLine && ["center", "right"].includes(alignment) ? <View style={lineStyles}/> : null}
            <Text
                style={[
                    styles.label,
                    labelStyle,
                    {
                        color,
                        marginRight: alignment === "right" ? 0 : Margins.smaller,
                        marginLeft: alignment === "left" ? 0 : Margins.smaller
                    },
                ]}
                onPress={onLabelPress}>
                {label}
            </Text>
            {hasLine && ["center", "left"].includes(alignment) ? <View style={lineStyles}/> : null}
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

export default memo(LinedText);
