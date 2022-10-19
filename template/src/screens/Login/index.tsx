import React, {useCallback} from "react";
import {StyleSheet, Text} from "react-native";
import {Margins} from "~/constants";
import Button from "~/components/ui/Button";
import TextInput from "~/components/ui/TextInput";
import PageContainer from "~/components/containers/PageContainer";
import AuthService from "~/services/authService";

const LoginPage = () => {
    const onPress = useCallback(() => {
        AuthService.loginUser({
            token: "loggedIn",
            refreshToken: "loggedIn"
        });
    }, []);

    return <PageContainer>
        <Text>Login</Text>
        <TextInput label={"Username"} containerStyle={styles.input}/>
        <TextInput label={"Username"} containerStyle={styles.input}/>
        <Button label={"Login"} style={styles.button} onPress={onPress}/>
    </PageContainer>;
};

const styles = StyleSheet.create({
    input: {
        flex: 0,
        marginTop: Margins.smaller,
    },
    button: {
        flex: 0,
        marginTop: Margins.smaller
    }
});

export default LoginPage;
