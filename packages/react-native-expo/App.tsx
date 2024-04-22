import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";

// Third Party Libraries
import { NdefRecord } from "react-native-nfc-manager";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import Toast from "react-native-toast-message";

// Screens
import WriteScreen from "./screens/write";
import ProductScreen from "./screens/product";
import OnchainScreen from "./screens/onchain";
import NotificationsScreen from "./screens/notifications";
import WriteSuccessScreen from "./screens/write_success";
import OnboardingScreen from "./screens/onboarding";
import MenuScreen from "./screens/menu";

import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import ThemeScreen from "./screens/theme";
import LanguageScreen from "./screens/language";
import useAuth from "./state/auth";

export type RootStackParamList = {
  Onboarding: undefined;
  Menu: undefined;
  Home: undefined;
  Tags: undefined;
  History: undefined;
  Profile: undefined;
  Language: undefined;
  Theme: undefined;
  Scan: undefined;
  Write: undefined;
  WriteSuccess: undefined;
  Product: { nfcTag: NdefRecord[] };
  Onchain: { nfcTag: NdefRecord[] };
  Notifications: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

GoogleSignin.configure({
  webClientId: `10292546775-sdn2m38cu803n1i5gnghmc4u6iqcqlaq.apps.googleusercontent.com`,
});
// webClientId: `10292546775-sdn2m38cu803n1i5gnghmc4u6iqcqlaq.apps.googleusercontent.com`,

export default function App() {
  return (
    <>
      <NavigationContainer>
        <ExpoStatusBar style="auto" />
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="Onboarding"
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="Language" component={LanguageScreen} />
          <Stack.Screen name="Theme" component={ThemeScreen} />
          <Stack.Screen name="Write" component={WriteScreen} />
          <Stack.Screen name="WriteSuccess" component={WriteSuccessScreen} />
          <Stack.Screen name="Product" component={ProductScreen} />
          <Stack.Screen name="Onchain" component={OnchainScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}
