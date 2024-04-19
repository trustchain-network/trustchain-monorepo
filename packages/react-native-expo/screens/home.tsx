import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons, Feather, AntDesign, FontAwesome6 } from "@expo/vector-icons";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "../App";
import { StackScreenProps } from "@react-navigation/stack";
import i18n from "../lib/i18n";
import CustomText from "../components/CustomText";

type Props = StackScreenProps<RootStackParamList>;

export default function HomeScreen({ navigation }: Props) {
  const menu = [
    {
      icon: <Feather name="edit" size={24} color="#00ACEE" />,
      label: i18n.t("home.write"),
      link: "Write",
    },
    {
      icon: <FontAwesome6 name="nfc-directional" size={24} color="#00ACEE" />,
      label: i18n.t("home.scan"),
      link: "Scan",
    },
    {
      icon: <Feather name="clock" size={24} color="#00ACEE" />,
      label: i18n.t("home.history"),
      link: "History",
    },
    {
      icon: <AntDesign name="shoppingcart" size={24} color="#00ACEE" />,
      label: i18n.t("home.subscribe"),
      link: "Subscribe",
    },
  ];

  return (
    <SafeAreaView className="p-5 bg-light dark:bg-dark flex-1 space-y-5">
      <View className="flex-row items-center justify-between">
        <Image
          source={require("../assets/logo_blue.png")}
          style={{ width: 142, height: 32 }}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Notifications")}>
          <Ionicons name="notifications-outline" size={24} color="#979DA4" />
        </TouchableOpacity>
      </View>
      <LinearGradient className="rounded-2xl" colors={["#00AAEB", "#1AD4BC"]}>
        <View className=" relative p-5">
          <Image
            className="absolute right-0 top-0"
            source={require("../assets/home/pattern.png")}
          />
          <View className="flex-row items-center justify-between">
            <View>
              <CustomText className="text-xs text-left text-white">
                {i18n.t("home.scanQuota")}
              </CustomText>
              <CustomText className="text-lg font-semibold text-left text-white">
                1.200
              </CustomText>
            </View>
            <View>
              <CustomText className="text-xs text-right text-white">
                {i18n.t("home.writeQuota")}
              </CustomText>
              <CustomText className="text-lg font-semibold text-right text-white">
                286
              </CustomText>
            </View>
          </View>
          <View className="flex-row rounded-[16px] bg-white/90 p-3 px-5 justify-between mt-3">
            {menu.map((x) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate(x.link as any)}
                  key={x.link}
                >
                  <View className="flex flex-col items-center space-y-2">
                    <LinearGradient
                      className="p-3 rounded-full border border-white"
                      colors={["rgba(21,172,151,0.0)", "rgba(21,172,151,0.0)"]}
                    >
                      {x.icon}
                    </LinearGradient>
                    <CustomText className="text-body text-[10px]">
                      {x.label}
                    </CustomText>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </LinearGradient>
      <View>
        <CustomText className="text-lg font-semibold">
          {i18n.t("myTags.myTags")}
        </CustomText>
        <View className="flex flex-col items-center space-y-4 mt-8">
          <Image
            source={require("../assets/tags/empty.png")}
            style={{ width: 90, height: 100 }}
          />
          <CustomText className="text-lg font-semibold text-center">
            {i18n.t("myTags.emptyTitle")}
          </CustomText>
          <CustomText className="text-sm text-grey text-center">
            {i18n.t("myTags.emptyDescription")}
          </CustomText>
          <Button
            onPress={() => {
              navigation.navigate("Write");
            }}
            className="w-fit"
            label={i18n.t("myTags.writeNFCTags")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
