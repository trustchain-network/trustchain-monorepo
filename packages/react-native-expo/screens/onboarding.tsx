import { View, Image, TouchableOpacity, Pressable, Text } from "react-native";
import { useState, useCallback } from "react";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button } from "../components/Button";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { RootStackParamList } from "../App";
import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import i18n from "../lib/i18n";
import { StackScreenProps } from "@react-navigation/stack";
import useAuth from "../state/auth";
import { showToast } from "../lib/utils";
import CustomText from "../components/CustomText";

type Props = StackScreenProps<RootStackParamList, "Onboarding">;

export const languageOptions = [
  {
    label: "English",
    code: "en",
    flag: require("../assets/languages/us.png"),
  },
  {
    label: "Bahasa Indonesia",
    code: "id",
    flag: require("../assets/languages/id.png"),
  },
  {
    label: "Spanish",
    code: "es",
    flag: require("../assets/languages/es.png"),
  },
  {
    label: "Dutch",
    code: "nl",
    flag: require("../assets/languages/nl.png"),
  },
  {
    label: "Chinese",
    code: "cn",
    flag: require("../assets/languages/cn.png"),
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  // const { colorScheme } = useColorScheme();
  const [currentOnboardingIndex, setCurrentOnboardingIndex] = useState(0);
  const [showLanguages, setShowLanguages] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const { setUser } = useAuth();

  const onboardingImages = [
    require("../assets/onboarding/illustration_1.png"),
    require("../assets/onboarding/illustration_2.png"),
    require("../assets/onboarding/illustration_3.png"),
    require("../assets/onboarding/illustration_4.png"),
  ];

  const locale = i18n.locale;
  const currentFlag = languageOptions.find((el) => el.code == locale)!.flag;

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setShowSheet(false);
    } else {
      setShowSheet(true);
    }
  }, []);

  const guestLogin = async () => {
    try {
      await auth().signInAnonymously();
      navigation.navigate("Menu");
    } catch (error) {}
  };

  const googleLogin = async () => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const response = await auth().signInWithCredential(googleCredential);
      setUser(response);
      navigation.navigate("Menu");
      showToast({
        type: "success",
        title: "Login Success",
        subtitle: "You are signed in with Google",
      });
    } catch (error: any) {
      // if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      //   // user cancelled the login flow
      // } else if (error.code === statusCodes.IN_PROGRESS) {
      //   // operation (e.g. sign in) is in progress already
      // } else
      if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        showToast({
          type: "error",
          title: "Failed to Login",
          subtitle: "Google Play Services Are Not Available",
        });
      } else {
        showToast({
          type: "error",
          title: "Failed to Login",
          subtitle: "Invalid Configuration",
        });
      }
    }
  };

  return (
    <View className="bg-primary flex-1 relative p-5 py-10 gap-5">
      <Image
        className="absolute right-0 top-0"
        source={require("../assets/onboarding/pattern.png")}
      />
      {showLanguages && (
        <Pressable
          onPress={() => setShowLanguages(false)}
          className="absolute left-0 top-0 right-0 bottom-0 bg-black/[0.3] z-[98]"
        />
      )}
      <View className="flex-row items-center justify-between">
        <Image
          style={{ width: 142, height: 32 }}
          source={require("../assets/logo.png")}
        />
        <View className="relative">
          <TouchableOpacity onPress={() => setShowLanguages(true)}>
            <View className="flex-row space-x-3 items-center">
              <Image style={{ width: 24, height: 24 }} source={currentFlag} />
              <AntDesign name="down" color="white" />
            </View>
          </TouchableOpacity>
          {showLanguages && (
            <View className="absolute right-0 top-[110%] z-[99] space-y-5 w-[181px] bg-light dark:bg-dark p-3 rounded-md">
              {languageOptions.map((x) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      i18n.locale = x.code;
                      setShowLanguages(false);
                    }}
                    key={x.code}
                  >
                    <View className="flex-row items-center space-x-2">
                      <Image
                        style={{ width: 24, height: 24 }}
                        source={x.flag}
                      />
                      <CustomText className="whitespace-nowrap">
                        {x.label}
                      </CustomText>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          )}
        </View>
      </View>
      <Image
        style={{ width: 343, height: 400 }}
        source={onboardingImages[currentOnboardingIndex]}
      />
      <CustomText className="text-3xl text-white text-center font-bold ">
        {i18n.t(`onboarding.${currentOnboardingIndex + 1}.title`)}
      </CustomText>
      <CustomText className="text-sm text-white text-center">
        {i18n.t(`onboarding.${currentOnboardingIndex + 1}.description`)}
      </CustomText>
      {currentOnboardingIndex + 1 !== onboardingImages.length ? (
        <Button
          variant="secondary"
          label={i18n.t("onboarding.next")}
          onPress={() => setCurrentOnboardingIndex(currentOnboardingIndex + 1)}
        />
      ) : (
        <Button
          variant="secondary"
          label={i18n.t("onboarding.getStarted")}
          onPress={() => setShowSheet(true)}
        />
      )}
      {currentOnboardingIndex !== 0 &&
        currentOnboardingIndex !== onboardingImages.length && (
          <TouchableOpacity
            onPress={() =>
              setCurrentOnboardingIndex(currentOnboardingIndex - 1)
            }
          >
            <CustomText className="text-white text-center">
              {i18n.t("onboarding.back")}
            </CustomText>
          </TouchableOpacity>
        )}
      {showSheet && (
        <View className="absolute left-0 top-0 right-0 bottom-0 bg-black/[0.5]"></View>
      )}
      <BottomSheet
        snapPoints={[350]}
        enablePanDownToClose
        index={showSheet ? 0 : -1}
        onChange={handleSheetChanges}
        onClose={() => setShowSheet(false)}
        backgroundStyle={
          {
            // backgroundColor: colorScheme === "dark" ? "#0F172A" : "#FFFFFF",
          }
        }
      >
        <BottomSheetView style={{ flex: 1, zIndex: 99 }}>
          <View className="px-5 py-3 space-y-4">
            <CustomText className="text-2xl text-center font-semibold text-foreground dark:text-white">
              {i18n.t("onboarding.getStarted")}
            </CustomText>
            <TouchableOpacity onPress={guestLogin}>
              <View className="flex-row justify-center space-x-3 items-center border border-gray-300 p-3 rounded-[12px]">
                <MaterialCommunityIcons
                  name="incognito"
                  size={24}
                  color="#00ACEE"
                />
                <CustomText className="text-base font-medium">
                  {i18n.t("onboarding.authentication.guest")}
                </CustomText>
              </View>
            </TouchableOpacity>
            <View className="flex-row space-x-5 items-center">
              <View className="flex-1 h-[1px] bg-gray-200"></View>
              <CustomText className="text-grey text-base">
                {i18n.t("onboarding.authentication.or")}
              </CustomText>
              <View className="flex-1 h-[1px] bg-gray-200"></View>
            </View>
            <TouchableOpacity onPress={() => googleLogin()}>
              <View className="flex-row justify-center space-x-3 items-center border border-gray-300 p-3 rounded-[12px]">
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/onboarding/google.png")}
                />
                <CustomText className="text-base font-medium">
                  {i18n.t("onboarding.authentication.google")}
                </CustomText>
              </View>
            </TouchableOpacity>
            <Text className="text-center">
              <Text className="text-center text-grey">
                {i18n.t("onboarding.authentication.note")}
              </Text>
              <Text className="text-primary">
                {" "}
                {i18n.t("onboarding.authentication.termsAndConditions")}
              </Text>
            </Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
}
