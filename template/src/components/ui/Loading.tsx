import React, {memo} from "react";
import {Bar, Circle, Pie} from "react-native-progress";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {Colors} from "../../config/ui";

interface Props {
    fullScreen?: boolean;
    fullWidth?: boolean;
    size?: number;
    containerStyle?: StyleProp<ViewStyle>;
    type?: "bar" | "circle" | "pie";
    progress?: number;
    color?: string;
}

const Loading = ({
    fullScreen,
    fullWidth,
    size = 20,
    type = "circle",
    containerStyle,
    progress,
    color = Colors.primary,
}: Props) => {
    return (
        <View
            style={[styles.container, fullScreen && styles.fullScreen, fullWidth && styles.fullWidth, containerStyle]}>
            {type === "circle" ? <Circle color={color} animated size={size} indeterminate/> : null}
            {type === "bar" ? (
                <Bar
                    color={color}
                    animated
                    indeterminate
                    style={styles.bar}
                    height={size}
                    useNativeDriver
                    borderWidth={0}
                    borderRadius={0}
                />
            ) : null}
            {type === "pie" ? <Pie size={size} color={color} indeterminate progress={progress}/> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    fullWidth: {
        width: "100%",
    },
    fullScreen: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: "center",
        alignItems: "center"
    },
    bar: {
        width: "100%",
    },
});

export default memo(Loading);
