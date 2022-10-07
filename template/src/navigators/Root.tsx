import * as React from "react";
import { CommonActions, NavigationContainerRef } from "@react-navigation/native";

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export const navigateBack = () => {
	navigationRef?.current?.goBack();
};

export const navigate = (name: string, params: any = {}) => {
	if ([ "Hello" ].includes(name)) {
		return navigationRef.current?.navigate(name, params);
	} else {
		return navigationRef.current?.navigate({
			name,
			params,
			key: `${name}${Object.keys(params).map(i => [ i, params[i] ]).flat().join("-")}`
		});
	}
};

export const navigateAndReset = (routes: any[] = [], index: number = 0) => {
	navigationRef.current?.dispatch(
		CommonActions.reset({
			index,
			routes
		})
	);
};
