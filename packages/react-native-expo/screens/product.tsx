import { View, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLayoutEffect } from "react";
import { RootStackParamList } from "../App";
import { SafeAreaView } from "react-native-safe-area-context";
import i18n from "../lib/i18n";
import { StackScreenProps } from "@react-navigation/stack";
import CustomText from "../components/CustomText";
import Header from "../components/Header";

type Props = StackScreenProps<RootStackParamList, "Product">;

export default function ProductScreen({ navigation, route }: Props) {
  // const { colorScheme } = useColorScheme();
  const details = [
    {
      label: i18n.t("product.productId"),
      value: "17081945",
    },
    {
      label: i18n.t("product.brandId"),
      value: "19450817",
    },
    {
      label: i18n.t("product.brand"),
      value: "Nike",
    },
    {
      label: i18n.t("product.modelName"),
      value: "Nike Air Mag",
    },
    {
      label: i18n.t("product.releaseYear"),
      value: "2011",
    },
    {
      label: i18n.t("product.color"),
      value: "Silver Grey",
    },
    {
      label: i18n.t("product.size"),
      value: "Size",
    },
  ];

  return (
    <SafeAreaView className="flex-1 px-2 pb-3 bg-background-light dark:bg-background-dark">
      <Header title="Product Details" navigation={navigation} />
      <ScrollView className="bg-background flex-1 space-y-5 p-3">
        <Image
          source={require("../assets/product/product_1.png")}
          className="w-full h-[275px] rounded-[24px]"
        />
        <View>
          <CustomText className="text-2xl font-semibold">
            Nike Air Mag
          </CustomText>
          <CustomText className="text-body text-sm mt-2">
            The Nike Air Mag is a legendary sneaker that captivates enthusiasts
            with its futuristic design and cultural significance. Inspired by
            the iconic footwear featured in the movie "Back to the Future Part
            II," these limited-edition sneakers were first introduced in 2011.
            Boasting self-lacing technology and a sleek, high-top silhouette,
            the Air Mag embodies innovation and imagination.
          </CustomText>
        </View>
        <View className="flex flex-col space-y-2">
          <CustomText className="font-semibold text-base">
            {i18n.t("product.detail")}
          </CustomText>
          {details.map((x) => {
            return (
              <View key={x.label} className="flex-row items-center space-x-1">
                <View className="w-[125px]">
                  <CustomText>{x.label}</CustomText>
                </View>
                <CustomText>{x.value}</CustomText>
              </View>
            );
          })}
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("Onchain", {
              nfcTag: [],
            })
          }
          activeOpacity={0.5}
          className="mb-5 p-3 border border-primary rounded-[10px]"
        >
          <CustomText className="text-primary text-center">
            {i18n.t("product.view")}
          </CustomText>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
