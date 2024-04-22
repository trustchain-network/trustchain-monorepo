import { View, Image } from "react-native";
import { Button } from "../components/Button";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import { StackScreenProps } from "@react-navigation/stack";
import i18n from "../lib/i18n";
import CustomText from "../components/CustomText";

type Props = StackScreenProps<RootStackParamList>;

export default function HistoryScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="bg-light dark:bg-dark p-5 flex-1">
      <CustomText className="font-semibold text-lg">Scan History</CustomText>
      <View className="flex flex-col items-center space-y-5 mt-8">
        <Image
          source={require("../assets/history/empty.png")}
          style={{ width: 90, height: 100 }}
        />
        <CustomText className="text-lg font-semibold">
          {i18n.t("history.emptyTitle")}
        </CustomText>
        <CustomText className="text-[14px] text-grey">
          {i18n.t("history.emptyDescription")}
        </CustomText>
        <Button
          onPress={() => navigation.navigate("Scan")}
          className="w-fit"
          label={i18n.t("history.scanNFCTags")}
        />
      </View>
    </SafeAreaView>
  );
}
