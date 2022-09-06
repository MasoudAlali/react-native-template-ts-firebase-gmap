import React, { FunctionComponent } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EventEmitter from "../services/eventEmitter";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Colors } from "../config/ui";
import Sample from "../pages/Sample";
import Hello from "../pages/Hello";
import LoginPage from "../pages/Login";
import Icon from "../components/ui/Icon";

export type RootStackParamList = {
	Hello: undefined;
	Sample: {
		title: string;
	}
};

const Tab = createBottomTabNavigator<RootStackParamList>();
// @refresh reset

const TabStack = function () {
	return (
		<Tab.Navigator
			backBehavior={"history"}
			screenOptions={{
				headerShown: false
			}}
			initialRouteName={"Hello"}>
			<Tab.Screen
				name={"Hello"}
				options={{
					tabBarIcon: ({focused}) => (<Icon name={"message"} size={24} color={focused ? Colors.primary : Colors.primary_200}/>)
				}}
				component={Hello}
			/>
		</Tab.Navigator>
	);
};

const MainStackNavigator = createStackNavigator();

export const MainStack = () => {
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	console.log(isLoggedIn);

	return (
		<MainStackNavigator.Navigator
			initialRouteName={isLoggedIn ? "Main" : "Main"}
			screenListeners={{
				blur: () => {
					EventEmitter.emit("CloseEverything");
				},
			}}
			screenOptions={{
				headerShown: false,
				cardStyle: {
					backgroundColor: Colors.white,
				},
				presentation: "card",
			}}>
			<MainStackNavigator.Screen name={"Main"} component={TabStack}/>
			<MainStackNavigator.Screen name={"Login"} component={LoginPage}/>
			<MainStackNavigator.Screen name={"Sample"} component={Sample as FunctionComponent}/>
		</MainStackNavigator.Navigator>
	);
};

const RootStackNavigator = createStackNavigator();

const RootStack = () => {
	return (
		<RootStackNavigator.Navigator
			screenOptions={{
				headerShown: false,
			}}>
			<RootStackNavigator.Screen name="Root" component={MainStack}/>
		</RootStackNavigator.Navigator>
	);
};

export default RootStack;
