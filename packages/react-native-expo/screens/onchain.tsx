import { View, ScrollView, SafeAreaView } from "react-native";
import { RootStackParamList } from "../App";
import { StackScreenProps } from "@react-navigation/stack";
import moment from "moment";
import i18n from "../lib/i18n";
import CustomText from "../components/CustomText";
import Header from "../components/Header";

type Props = StackScreenProps<RootStackParamList, "Onchain">;

export default function OnchainScreen({ navigation }: Props) {
  const data = [
    {
      title: i18n.t("product.proofOfAuthenticity"),
      children: [
        {
          label: i18n.t("product.blockchainTransactionID"),
          value: `0x5A7bF9dA83Fb91B5e4E63734Aa139684C78AfD5b`,
        },
        {
          label: i18n.t("product.timestamp"),
          value: moment.utc(new Date()).format("MM-DD-YYYY hh:mm:ss A"),
        },
        {
          label: i18n.t("product.digitalSignature"),
          value: `0x7F8B92D87A51E0F8C304D3B90C6F2A3C`,
        },
        {
          label: i18n.t("product.status"),
          value: "Authentic",
        },
      ],
    },
    {
      title: i18n.t("product.supplyChainTransparency"),
      children: [
        {
          label: i18n.t("product.manufacturer"),
          value: "XYZ Footwear Co.",
        },
        {
          label: i18n.t("product.productionDate"),
          value: moment(new Date()).format("YYYY-MM-DD"),
        },
        {
          label: i18n.t("product.shippingCarrier"),
          value: "ABC Logistics",
        },
        {
          label: "Delivery Date",
          value: moment(new Date()).format("YYYY-MM-DD"),
        },
        {
          label: "Seller",
          value: "Sneaker Emporium",
        },
      ],
    },
    {
      title: i18n.t("product.ownershipConfirmation"),
      children: [
        {
          label: i18n.t("product.ownerName"),
          value: "Phillip Haase",
        },
        {
          label: i18n.t("product.transactionId"),
          value: "0x9c3eFb34A7F1e2D6Bb0c1a2fDd9A4b8e1",
        },
        {
          label: i18n.t("product.timestamp"),
          value: moment.utc(new Date()).format("MM-DD-YYYY hh:mm:ss A"),
        },
      ],
    },
    {
      title: i18n.t("product.immutableRecord"),
      children: [
        {
          label: i18n.t("product.blockchainTransactionID"),
          value: "0xE6c7A32B9fD40E8F3bDbfe77C6A8D0f21",
        },
        {
          label: i18n.t("product.timestamp"),
          value: moment.utc(new Date()).format("MM-DD-YYYY hh:mm:ss A"),
        },
        {
          label: i18n.t("product.status"),
          value: "Authentic",
        },
      ],
    },
  ];

  return (
    <SafeAreaView>
      <Header title="Onchain Verification" navigation={navigation} />
      <ScrollView className="bg-light dark:bg-background-dark p-5">
        {data.map((x) => (
          <View key={x.title}>
            <CustomText className="font-semibold mb-2 text-base">
              {x.title}
            </CustomText>
            {x.children.map((y) => (
              <View key={y.label + x.title} className="mb-1">
                <CustomText className="text-sm text-body mb-1">
                  {y.label}
                </CustomText>
                <CustomText className="text-sm">{y.value}</CustomText>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
