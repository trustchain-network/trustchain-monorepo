import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RootStackParamList } from "../App";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomText from "./CustomText";
import { useColorScheme } from "nativewind";

export default function Header({
  title,
  navigate,
  navigation,
}: {
  title: string;
  navigate?: boolean;
  navigation: StackNavigationProp<RootStackParamList>;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View className="flex-row items-center justify-between p-5 bg-light dark:bg-dark">
      <TouchableOpacity
        onPress={() =>
          navigate ? navigation.navigate("Menu") : navigation.goBack()
        }
      >
        <MaterialCommunityIcons
          color={colorScheme === "dark" ? "#FFFFFF" : "#000000"}
          size={24}
          name="arrow-left"
        />
      </TouchableOpacity>
      <CustomText style={{ fontSize: 18, fontWeight: "bold" }}>
        {title}
      </CustomText>
      <TouchableOpacity className="opacity-0">
        <MaterialCommunityIcons size={24} name="arrow-left" />
      </TouchableOpacity>
    </View>
  );
}
