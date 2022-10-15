/**
 * @format
 */

import "react-native";
import React from "react";
import App from "../src/App";

import { render } from "@testing-library/react-native";

test("renders correctly", async () => {
    render(<App />);
});
