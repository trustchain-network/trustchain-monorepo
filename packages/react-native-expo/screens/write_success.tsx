import { View, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../App";
import { Image } from "react-native";
import { Button } from "../components/Button";
import { StackScreenProps } from "@react-navigation/stack";
import i18n from "../lib/i18n";
import CustomText from "../components/CustomText";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = StackScreenProps<RootStackParamList, "WriteSuccess">;

export default function WriteSuccessScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="flex-1 bg-light dark:bg-dark">
      <Header title="Write NFC Tags" navigation={navigation} />
      <View className="flex flex-col items-center p-8 gap-5 bg-light dark:bg-dark flex-1">
        <Image
          style={{ width: 150, height: 150 }}
          source={require("../assets/write/success.png")}
        />
        <CustomText className="text-2xl font-semibold text-center">
          {i18n.t("write.successTitle")}
        </CustomText>
        <CustomText className="text-base text-body text-center max-w-[300px]">
          {i18n.t("write.successDescription")}
        </CustomText>
        <Button
          onPress={() => navigation.navigate("Scan")}
          className="w-full"
          label="Try to Scan"
        ></Button>
        <TouchableOpacity onPress={() => navigation.navigate("Menu")}>
          <CustomText className="text-grey text-base font-medium">
            Back to Homepage
          </CustomText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
