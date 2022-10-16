import React, {useCallback} from "react";
import {StyleSheet, Text, View} from "react-native";
import Button from "~/components/ui/Button";
import {Margins} from "~/constants";
import Header from "~/components/shared/Header";
import PageContainer from "~/components/containers/PageContainer";
import {useNavigation} from "@react-navigation/native";
import {RootStackParamList} from "~/navigators";
import {StackNavigationProp} from "@react-navigation/stack";

const Hello = () => {
    const {navigate} = useNavigation<StackNavigationProp<RootStackParamList>>();
    const onPress = useCallback(() => {
        navigate("Sample", {
            title: "Sample Page"
        });
    }, []);

    return <View style={styles.container}>
        <Header title={"Sample"} hasBackButton={false}/>
        <PageContainer>
            <Text>Hello there</Text>
            <Button label={"Goto Sample Page"} onPress={onPress} style={styles.button}/>
        </PageContainer>
    </View>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    button: {
        flex: 0,
        marginTop: Margins.smaller
    }
});

export default Hello;
