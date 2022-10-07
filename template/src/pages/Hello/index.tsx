import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "../../components/ui/Button";
import { navigate } from "../../navigators/Root";
import { Margins } from "../../config/ui";
import Header from "../../components/shared/Header";
import PageContainer from "../../components/containers/PageContainer";

const Hello = () => {
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
