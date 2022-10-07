import React, {FunctionComponent} from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import EventEmitter from "../services/eventEmitter";
import {useSelector} from "react-redux";
import {RootState} from "../store";
import {Colors} from "../config/ui";
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

const getTabBarIcon = (name: keyof RootStackParamList) => {
	let iconName: string;

	switch (name) {
	case "Hello":
		iconName = "message";
		break;
	default:
		iconName = "question";
	}

	return ({focused}: { focused: boolean }) =>
		<Icon
			name={iconName}
			size={24}
			color={focused ? Colors.primary : Colors.primary_200}/>;
};

const Tab = createBottomTabNavigator<RootStackParamList>();

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
					tabBarIcon: getTabBarIcon("Hello")
				}}
				component={Hello}
			/>
		</Tab.Navigator>
	);
};

const MainStackNavigator = createStackNavigator();

export const MainStack = () => {
	const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

	return (
		<MainStackNavigator.Navigator
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
			{isLoggedIn ?
				<>
					<MainStackNavigator.Screen name={"Main"} component={TabStack}/>
					<MainStackNavigator.Screen name={"Sample"} component={Sample as FunctionComponent}/>
				</>
				: <>
					<MainStackNavigator.Screen name={"Login"} component={LoginPage}/>
				</>
			}
		</MainStackNavigator.Navigator>
	);
};