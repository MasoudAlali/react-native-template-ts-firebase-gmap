import { NativeModules as RNNativeModules } from "react-native";
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

RNNativeModules.UIManager = RNNativeModules.UIManager || {};
RNNativeModules.UIManager.RCTView = RNNativeModules.UIManager.RCTView || {};
RNNativeModules.RNGestureHandlerModule =
  RNNativeModules.RNGestureHandlerModule || {
      State: { BEGAN: "BEGAN", FAILED: "FAILED", ACTIVE: "ACTIVE", END: "END" },
      attachGestureHandler: jest.fn(),
      createGestureHandler: jest.fn(),
      dropGestureHandler: jest.fn(),
      updateGestureHandler: jest.fn(),
  };
RNNativeModules.PlatformConstants = RNNativeModules.PlatformConstants || {
    forceTouchAvailable: false,
};

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");
jest.mock("react-native-simple-toast", () => ({
    SHORT: jest.fn(),
    LONG: jest.fn(),
    show: jest.fn(),
}));
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
jest.mock("@react-native-firebase/messaging", () => jest.fn(() => ({
    hasPermission: jest.fn(() => Promise.resolve(true)),
    subscribeToTopic: jest.fn(),
    unsubscribeFromTopic: jest.fn(),
    requestPermission: jest.fn(() => Promise.resolve(true)),
    getToken: jest.fn(() => Promise.resolve("myMockToken")),
    onTokenRefresh: jest.fn(() => Promise.resolve("myMockToken"))
})));
jest.mock("@react-native-firebase/crashlytics", () => jest.fn(() => ({
    recordError: jest.fn()
})));
jest.mock("@react-native-firebase/analytics", () => jest.fn(() => ({
    logAppOpen: jest.fn(),
    logLogin: jest.fn(),
    logScreenView: jest.fn(),
})));
