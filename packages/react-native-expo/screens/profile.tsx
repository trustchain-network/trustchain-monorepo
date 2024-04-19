import { View, Image, Linking } from "react-native";
import {
  Entypo,
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { useRef, useState } from "react";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { RootStackParamList } from "../App";
import { TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import Toast from "react-native-toast-message";
import auth from "@react-native-firebase/auth";
import i18n from "../lib/i18n";
import useAuth from "../state/auth";
import * as ImagePicker from "expo-image-picker";
import storage from "@react-native-firebase/storage";
import { showToast } from "../lib/utils";
import useTab from "../state/tab";
import CustomText from "../components/CustomText";
// import { useColorScheme } from "nativewind";
type Props = StackScreenProps<RootStackParamList>;

export default function ProfileScreen({ navigation }: Props) {
  const loginBotomSheetRef = useRef<BottomSheet>(null);
  const logoutBottomSheetRef = useRef<BottomSheet>(null);
  const [showLoginSheet, setShowLoginSheet] = useState(false);
  const [showLogoutSheet, setShowLogoutSheet] = useState(false);
  const { user, setUser } = useAuth();
  const { setLoading } = useTab();
  // const { colorScheme } = useColorScheme();
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

      setShowLoginSheet(false);
      loginBotomSheetRef.current?.close();

      Toast.show({
        type: "success",
        text1: "Login Success",
        text1Style: { fontSize: 14 },
        text2: "You are signed in with Google",
        position: "top",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Login Failed",
        text1Style: { fontSize: 14 },
        text2: "Something went wrong. Please try again later",
        position: "top",
      });
    }
  };

  const logout = async () => {
    auth().signOut();
    navigation.navigate("Onboarding");
    showToast({
      type: "success",
      title: "Success",
      subtitle: "You have successfully logged out",
    });
  };

  const pickAndUploadProfileImage = async () => {
    try {
      // No permissions request is necessary for launching the image library
      setLoading(true);
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        const reference = storage().ref(
          `/profile/${user!.user.email! + Date.now()}`
        );
        await reference.putFile(result.assets[0].uri);
        const downloadURL = await reference.getDownloadURL();
        await auth().currentUser?.updateProfile({
          photoURL: downloadURL,
        });
        showToast({
          type: "success",
          title: "Success",
          subtitle: "Profile Image Changed Successfully",
        });
      }
      setLoading(false);
    } catch (error) {
      showToast({
        type: "error",
        title: "Error",
        subtitle: "Failed to change your profile image. Please try again later",
      });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="p-5 bg-light dark:bg-dark flex-1">
      <View className="flex-1">
        <CustomText className="text-lg font-semibold mb-8">
          {i18n.t("profileAuthenticated.profile")}
        </CustomText>
        {user ? (
          <View className="flex flex-col items-center space-y-2">
            <TouchableOpacity onPress={pickAndUploadProfileImage}>
              <View className="relative">
                {user.user.photoURL ? (
                  <Image
                    source={{ uri: user.user.photoURL }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/profile/empty.png")}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                  />
                )}
                <View className="absolute bottom-0 right-0 bg-primary p-2 rounded-full">
                  <MaterialCommunityIcons
                    name="camera"
                    size={18}
                    color="#FFFFFF"
                  />
                </View>
              </View>
            </TouchableOpacity>
            <CustomText className="text-2xl font-semibold">
              {user.user.displayName}
            </CustomText>
            <CustomText className="text-grey text-sm">
              {user.user.email}
            </CustomText>
          </View>
        ) : (
          <View className="flex flex-col items-center space-y-3">
            <Image
              source={require("../assets/profile/empty.png")}
              style={{ width: 150, height: 150 }}
            />
            <CustomText className="text-lg font-semibold">
              {i18n.t("profileNotAuthenticated.title")}
            </CustomText>
            <CustomText className="text-sm text-grey">
              {i18n.t("profileNotAuthenticated.description")}
            </CustomText>
            <Button
              onPress={() => setShowLoginSheet(true)}
              className="w-fit"
              label={i18n.t("profileNotAuthenticated.loginOrRegister")}
            />
          </View>
        )}
        <View className="flex flex-col space-y-5 mt-5">
          {user && (
            <TouchableOpacity onPress={() => navigation.navigate("Language")}>
              <View className="flex-row items-center justify-between bg-light dark:bg-dark/10 drop-shadow-md rounded-[16px] p-3 border border-gray-300 dark:border-gray-700">
                <View className="flex-row items-center space-x-3">
                  <View className="p-3 rounded-[10px] bg-success-bg-weak dark:bg-[#EFFAFF]/10">
                    <MaterialCommunityIcons
                      name="web"
                      size={24}
                      color="#50C793"
                    />
                  </View>
                  <CustomText className="font-medium text-sm">
                    {i18n.t("profileAuthenticated.language")}
                  </CustomText>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
          {user && (
            <TouchableOpacity onPress={() => navigation.navigate("Theme")}>
              <View className="flex-row items-center justify-between bg-light dark:bg-dark/10 drop-shadow-md rounded-[16px] p-3 border border-gray-300 dark:border-gray-700">
                <View className="flex-row items-center space-x-3">
                  <View className="p-3 rounded-[10px] bg-warning-bg-weak dark:bg-[#EFFAFF]/10">
                    <MaterialCommunityIcons
                      name="theme-light-dark"
                      size={24}
                      color="#DF8260"
                    />
                  </View>
                  <CustomText className="font-medium text-sm">
                    {i18n.t("profileAuthenticated.theme")}
                  </CustomText>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          )}
          <View className="rounded-[12px] overflow-hidden">
            <TouchableOpacity
              onPress={() => Linking.openURL("https://trustchain.com/")}
            >
              <View className="flex-row items-center justify-between bg-light dark:bg-dark/10 drop-shadow-md rounded-[16px] p-3 border border-gray-300 dark:border-gray-700">
                <View className="flex-row items-center space-x-3">
                  <View className="p-3 rounded-[10px] bg-[#FAFAFA] dark:bg-[#EFFAFF]/10">
                    <AntDesign name="filetext1" size={24} />
                  </View>
                  <CustomText className="font-medium text-sm">
                    {i18n.t("profileAuthenticated.termsAndConditions")}
                  </CustomText>
                </View>
                <Entypo name="chevron-right" size={24} color="black" />
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowLogoutSheet(true);
            }}
          >
            <View className="flex-row items-center justify-between bg-light dark:bg-dark/10 rounded-[16px] p-3 border border-gray-300 dark:border-gray-700">
              <View className="flex-row items-center space-x-3">
                <View className="p-3 rounded-[10px] bg-[#FAFAFA] dark:bg-[#EFFAFF]/10">
                  <MaterialIcons name="logout" size={24} color="#F1595C" />
                </View>
                <CustomText className="font-medium text-sm">
                  {i18n.t("profileAuthenticated.logout")}
                </CustomText>
              </View>
              <Entypo name="chevron-right" size={24} color="black" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {showLoginSheet && (
        <View className="absolute left-0 top-0 right-0 bottom-0 bg-black/[0.5]"></View>
      )}
      {showLogoutSheet && (
        <View className="absolute left-0 top-0 right-0 bottom-0 bg-black/[0.5]"></View>
      )}
      {/* Login Sheet  */}
      <BottomSheet
        ref={loginBotomSheetRef}
        style={{ zIndex: 99 }}
        snapPoints={[270]}
        enablePanDownToClose
        onClose={() => setShowLoginSheet(false)}
        index={showLoginSheet ? 0 : -1}
      >
        <BottomSheetView style={{ flex: 1, zIndex: 99 }}>
          <View className="px-5 py-3 space-y-4">
            <CustomText className="text-2xl text-center font-semibold">
              {i18n.t("profileNotAuthenticated.loginOrRegister")}
            </CustomText>
            <CustomText className="text-xs text-center font-semibold">
              <CustomText>
                {i18n.t("profileNotAuthenticated.byCompleting")}
              </CustomText>
              <CustomText className="text-primary">
                {" "}
                {i18n.t("profileNotAuthenticated.termsAndConditions")}
              </CustomText>
            </CustomText>
            <TouchableOpacity onPress={() => googleLogin()}>
              <View className="flex-row justify-center space-x-3 items-center border border-gray-300 p-3 rounded-[12px]">
                <Image
                  style={{ width: 24, height: 24 }}
                  source={require("../assets/onboarding/google.png")}
                />
                <CustomText>Continue with Google</CustomText>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowLoginSheet(false);
                loginBotomSheetRef.current?.close();
              }}
              className="p-3"
            >
              <CustomText className="text-grey text-center">Cancel</CustomText>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
      {/* Login Sheet End  */}

      {/* Logout Sheet  */}
      <BottomSheet
        ref={logoutBottomSheetRef}
        style={{ zIndex: 99 }}
        snapPoints={[440]}
        enablePanDownToClose
        onClose={() => setShowLogoutSheet(false)}
        index={showLogoutSheet ? 0 : -1}
      >
        <BottomSheetView style={{ flex: 1, zIndex: 99 }}>
          <View className="px-5 py-3 space-y-4 flex flex-col items-center">
            <Image
              source={require("../assets/profile/logout.png")}
              style={{ width: 150, height: 150 }}
            />
            <CustomText className="text-2xl text-center font-semibold px-12">
              {i18n.t("profileAuthenticated.logoutTitle")}
            </CustomText>
            <TouchableOpacity
              onPress={logout}
              className="p-3 border border-danger rounded-[12px] w-full"
            >
              <CustomText className="text-danger text-center font-medium text-base">
                Yes, Logout
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setShowLogoutSheet(false);
                logoutBottomSheetRef.current?.close();
              }}
              className="p-3"
            >
              <CustomText className="text-grey text-center text-base">
                Cancel
              </CustomText>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
      {/* Logout Sheet End  */}
    </SafeAreaView>
  );
}
