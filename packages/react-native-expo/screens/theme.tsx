import { View, SafeAreaView, TouchableOpacity } from "react-native";
import { RootStackParamList } from "../App";
import { StackScreenProps } from "@react-navigation/stack";
import {
  Entypo,
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useColorScheme } from "nativewind";
import CustomText from "../components/CustomText";
import Header from "../components/Header";

type Props = StackScreenProps<RootStackParamList>;

export const themeOptions = [
  {
    label: "Light Mode",
    className: "bg-warning-bg-weak",
    icon: <Entypo name="light-up" size={27} color={"#FA916B"} />,
    value: "light",
  },
  {
    label: "Dark Mode",
    className: "bg-background",
    icon: <Feather name="moon" size={27} color="#979DA4" />,
    value: "dark",
  },
  {
    label: "Default System",
    className: "bg-primary-bg-weak",
    icon: <MaterialIcons name="computer" size={27} color="#0072AB" />,
    value: "system",
  },
];

export default function ThemeScreen({ navigation }: Props) {
  const { colorScheme, setColorScheme } = useColorScheme();

  return (
    <SafeAreaView className="flex-1 bg-light dark:bg-dark">
      <Header title="Theme" navigation={navigation} />
      <View className="p-5  space-y-5">
        {themeOptions.map((x) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setColorScheme(x.value as "light" | "dark" | "system");
              }}
              key={x.label}
            >
              <View className="flex-row items-center justify-between drop-shadow-md rounded-[16px] p-3 border border-gray-300 bg-light dark:bg-black/10">
                <View className="flex-row space-x-2 items-center">
                  <View>{x.icon}</View>
                  <CustomText className="text-sm font-medium">
                    {x.label}
                  </CustomText>
                </View>
                {x.value === colorScheme && (
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
          );
        })}
      </View>
    </SafeAreaView>
  );
}
