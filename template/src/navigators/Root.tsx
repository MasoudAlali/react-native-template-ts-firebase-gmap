import * as React from "react";
import { CommonActions, NavigationContainerRef } from "@react-navigation/native";

export const navigationRef = React.createRef<NavigationContainerRef<any>>();

export function navigateBack() {
	navigationRef?.current?.goBack();
}

export function navigate(name: string, params: any = {}) {
	if ([ "Hello" ].includes(name)) {
		return navigationRef.current?.navigate(name, params);
	} else {
		return navigationRef.current?.navigate({
			name,
			params,
			key: `${name}${Object.keys(params).map(i => [ i, params[i] ]).flat().join("-")}`
		});
	}
}

export function navigateAndReset(routes: any[] = [], index = 0) {
	navigationRef.current?.dispatch(
		CommonActions.reset({
			index,
			routes
		})
	);
}

export function navigateAndSimpleReset(name: string, index = 0) {
	navigationRef.current?.dispatch(
		CommonActions.reset({
			index,
			routes: [ { name } ]
		})
	);
}
