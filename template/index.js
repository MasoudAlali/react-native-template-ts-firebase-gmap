/**
 * @format
 */

import {AppRegistry} from "react-native";
import App from "./src/App";
import {name as appName} from "./app.json";
import "./src/services/notificationService";
import "./src/services/analyticService";

AppRegistry.registerComponent(appName, () => App);
