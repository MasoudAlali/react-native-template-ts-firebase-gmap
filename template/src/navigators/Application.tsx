import React, { FunctionComponent, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import { navigationRef } from "./Root";

const Stack = createNativeStackNavigator();

let MainNavigator: FunctionComponent<React.PropsWithChildren<unknown>> | null;

const ApplicationNavigator = () => {
	const [ isApplicationLoaded, setIsApplicationLoaded ] = useState(false);
	const applicationIsLoading = false;

	useEffect(() => {
		if (MainNavigator == null && !applicationIsLoading) {
			MainNavigator = require("@/Navigators/Main").default;
			setIsApplicationLoaded(true);
		}
	}, [ applicationIsLoading ]);

	useEffect(
		() => () => {
			setIsApplicationLoaded(false);
			MainNavigator = null;
		},
		[]
	);

	return (
		<SafeAreaView style={styles.container}>
			<NavigationContainer ref={navigationRef}>
				<StatusBar
					barStyle={"dark-content"}
					backgroundColor={"#FFF"}
				/>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					{isApplicationLoaded && MainNavigator != null && (
						<Stack.Screen name="Main" component={MainNavigator}/>
					)}
				</Stack.Navigator>
			</NavigationContainer>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: { flex: 1, backgroundColor: "#FFF" }
});

export default ApplicationNavigator;
