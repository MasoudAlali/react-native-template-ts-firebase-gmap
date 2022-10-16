import React, {useEffect, useState} from "react";
import {ScrollView, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from "react-native";
import {ActiveOpacity, Colors, FontSizes, FontWeights, HitSlop, Margins, Paddings} from "~/constants";

interface Props {
    labels: string[];
    onTabChanged?: (tabIndex: number) => any;
    currentTab?: number;
    style?: StyleProp<ViewStyle>;
}

const Tabs = ({labels, onTabChanged, currentTab, style}: Props) => {
    const [_currentTab, setCurrentTab] = useState<number>(currentTab || 0);
    const _onTabPressed = (page: number) => {
        onTabChanged?.(page);
        setCurrentTab(page);
    };

    useEffect(() => {
        if (typeof currentTab === "number") setCurrentTab(currentTab);
    }, [currentTab]);

    return (
        <ScrollView
            horizontal
            style={[styles.wrapper, style]}
            contentContainerStyle={styles.container}
            showsHorizontalScrollIndicator={false}>
            {labels.map((i: string, _i) => (
                <TouchableOpacity
                    activeOpacity={ActiveOpacity}
                    hitSlop={HitSlop}
                    onPress={() => _onTabPressed(_i)}
                    key={i}
                    style={[styles.tabContainer, _i === _currentTab ? styles.tabActiveContainer : null]}>
                    <Text style={styles.tabTitle}>{i}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: Colors.white,
    },
    container: {
        flexDirection: "row",
    },
    tabContainer: {
        paddingVertical: Paddings.semiSmall,
        paddingHorizontal: Paddings.medium,
        flexDirection: "row",
        justifyContent: "center",
        borderBottomWidth: 2,
        borderBottomColor: Colors.white,
        marginHorizontal: Margins.smallest,
    },
    tabTitle: {
        color: Colors.text,
        fontSize: FontSizes.normal,
        fontWeight: FontWeights.semiBold,
    },
    tabActiveContainer: {
        borderBottomColor: Colors.primary,
    },
});

export default Tabs;
