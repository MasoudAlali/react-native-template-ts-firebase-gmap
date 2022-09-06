import React, { useCallback, useEffect } from "react";
import { Linking, Platform, SafeAreaView as RNSafeAreaView, StatusBar, StyleSheet } from "react-native";
import { persistor, store } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { navigationRef } from "./navigators/Root";
import { MainStack } from "./navigators/Main";
import Modal from "./components/ui/Modal";
import Logger, { LogKeys } from "./services/logger";
import AnalyticService from "./services/analyticService";

const SA = Platform.select<any>({
	android: SafeAreaView,
	ios: RNSafeAreaView,
});

const App = () => {
	const routeNameRef = React.useRef<string>();

	const onReady = useCallback(() => {
		routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name;
	}, []);

	const onStateChange = useCallback(async () => {
		const previousRouteName = routeNameRef.current;
		const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

		if (previousRouteName !== currentRouteName) {
			AnalyticService.logScreenView(currentRouteName);
		}
		routeNameRef.current = currentRouteName;
	}, []);

	useEffect(() => {
		Linking.addEventListener("url", handleOpenURL);

		return Linking.removeAllListeners("url");
	}, []);

	const handleOpenURL = (event: any) => {
		Logger.log(LogKeys.Component, { event });
	};

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<GestureHandlerRootView style={styles.mainContainer}>
					<SA style={styles.mainContainer}>
						<NavigationContainer ref={navigationRef} onReady={onReady} onStateChange={onStateChange}>
							<StatusBar barStyle={"light-content"}/>
							<MainStack/>
						</NavigationContainer>
					</SA>
					<Modal/>
				</GestureHandlerRootView>
			</PersistGate>
		</Provider>
	);
};

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
	},
});

export default App;
