import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createStackNavigator} from "@react-navigation/stack";
import {useSelector} from "react-redux";
import {RootState} from "~/store";
import {Colors} from "~/constants";
import Sample from "~/screens/Sample";
import Hello from "~/screens/Hello";
import LoginPage from "~/screens/Login";
import Icon from "~/components/ui/Icon";

export type RootStackParamList = {
    Main: undefined;
    Hello: undefined;
    Sample: {
        title: string;
    };
    Login: undefined;
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

const MainStackNavigator = createStackNavigator<RootStackParamList>();

export const MainStack = () => {
    const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

    return (
        <MainStackNavigator.Navigator
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
                    <MainStackNavigator.Screen name={"Sample"} component={Sample}/>
                </>
                : <>
                    <MainStackNavigator.Screen name={"Login"} component={LoginPage}/>
                </>
            }
        </MainStackNavigator.Navigator>
    );
};
