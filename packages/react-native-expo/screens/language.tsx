import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native";
import { RootStackParamList } from "../App";
import { StackScreenProps } from "@react-navigation/stack";
import { languageOptions } from "./onboarding";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import i18n from "../lib/i18n";
import CustomText from "../components/CustomText";
import { useColorScheme } from "nativewind";
import Header from "../components/Header";

type Props = StackScreenProps<RootStackParamList>;

export default function LanguageScreen({ navigation }: Props) {
  const [currentCode, setCurrentCode] = useState(i18n.locale);

  return (
    <SafeAreaView className="flex-1">
      <Header
        title={i18n.t("profileAuthenticated.language")}
        navigation={navigation}
      />
      <View className="p-5 space-y-5 bg-light dark:bg-background-dark flex-1">
        {languageOptions.map((x) => {
          return (
            <View key={x.code} className="rounded-[12px] overflow-hidden">
              <TouchableOpacity
                onPress={() => {
                  i18n.locale = x.code;
                  setCurrentCode(x.code);
                }}
                key={x.label}
              >
                <View className="flex-row items-center justify-between bg-light dark:bg-black/10 drop-shadow-md rounded-[16px] p-3 border border-gray-300 dark:border-gray-700">
                  <View className="flex-row space-x-2 items-center">
                    <Image source={x.flag} style={{ width: 24, height: 24 }} />
                    <CustomText className="text-sm font-medium">
                      {x.label}
                    </CustomText>
                  </View>
                  {x.code === currentCode && (
                    <View className="p-1 rounded-full bg-primary">
                      <MaterialCommunityIcons
                        name="check"
                        size={16}
                        color="#FFFFFF"
                      />
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
