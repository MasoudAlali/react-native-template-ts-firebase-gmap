import React from "react";
import {StyleSheet, Text} from "react-native";
import {RootStackParamList} from "~/navigators";
import {StackScreenProps} from "@react-navigation/stack";
import {CompositeScreenProps} from "@react-navigation/native";
import PageContainer from "~/components/containers/PageContainer";

interface Props extends CompositeScreenProps<StackScreenProps<RootStackParamList, "Sample">, any> {
}

const Sample = (props: Props) => {
    return <PageContainer>
        <Text style={styles.title}>{props.route?.params?.title}</Text>
    </PageContainer>;
};

const styles = StyleSheet.create({
    title: {}
});

export default Sample;
