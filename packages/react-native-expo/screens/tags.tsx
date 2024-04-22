import { View, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native";
import { Button } from "../components/Button";
import { RootStackParamList } from "../App";
import { StackScreenProps } from "@react-navigation/stack";
import CustomText from "../components/CustomText";
import i18n from "../lib/i18n";

type Props = StackScreenProps<RootStackParamList>;

export default function TagsScreen({ navigation }: Props) {
  return (
    <SafeAreaView className="p-5 bg-light dark:bg-dark flex-1">
      <View className="flex-row justify-between items-center">
        <CustomText className="text-lg font-semibold">
          {i18n.t("myTags.myTags")}
        </CustomText>
        <TouchableOpacity onPress={() => navigation.navigate("Write")}>
          <AntDesign name="plussquareo" size={24} color="#00ACEE" />
        </TouchableOpacity>
      </View>
      <View className="flex flex-col items-center space-y-4 mt-8">
        <Image
          source={require("../assets/tags/empty.png")}
          style={{ width: 90, height: 100 }}
        />
        <CustomText className="text-lg font-semibold">
          {i18n.t("myTags.emptyTitle")}
        </CustomText>
        <CustomText className="text-sm text-center text-grey">
          {i18n.t("myTags.emptyDescription")}
        </CustomText>
        <Button
          onPress={() => navigation.navigate("Write")}
          className="w-fit"
          label={i18n.t("myTags.writeNFCTags")}
        />
      </View>
    </SafeAreaView>
  );
}
