import { View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCallback, useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStackParamList } from "../App";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import i18n from "../lib/i18n";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import { StackScreenProps } from "@react-navigation/stack";
import CustomText from "../components/CustomText";
import { useColorScheme } from "nativewind";

type Props = StackScreenProps<RootStackParamList>;

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function ScanScreen({ navigation }: Props) {
  const { colorScheme } = useColorScheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [currentScan, setCurrentScan] = useState<"Hold" | "Success" | "Failed">(
    "Hold"
  );
  const [showSheet, setShowSheet] = useState(false);

  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  async function readNdef() {
    try {
      setShowSheet(true);
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      setCurrentScan("Success");
      if (tag) {
        navigation.navigate("Product", { nfcTag: tag.ndefMessage });
      }
    } catch (ex) {
      setCurrentScan("Failed");
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  }

  return (
    <SafeAreaView className="flex-1 p-5 bg-light dark:bg-dark">
      <View className="flex-row items-center justify-between">
        <Image
          source={require("../assets/logo_blue.png")}
          style={{ width: 142, height: 32 }}
        />
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
      <View className="items-center space-y-3 mt-8">
        <TouchableOpacity onPress={readNdef}>
          <Image source={require("../assets/scan/nfc.png")} />
        </TouchableOpacity>
        <CustomText className="text-2xl font-semibold">
          {i18n.t("scan.title")}
        </CustomText>
        <CustomText className="font-medium text-center text-grey">
          {i18n.t("scan.description")}
        </CustomText>
      </View>
      {showSheet && (
        <View className="absolute left-0 top-0 right-0 bottom-0 bg-black/[0.5]"></View>
      )}
      <BottomSheet
        snapPoints={[350]}
        ref={bottomSheetRef}
        index={showSheet ? 0 : -1}
        enablePanDownToClose
        onChange={handleSheetChanges}
        onClose={() => setShowSheet(false)}
        backgroundStyle={{
          backgroundColor: colorScheme === "dark" ? "#0F172A" : "#FFFFFF",
        }}
        style={{
          zIndex: 99,
        }}
      >
        <BottomSheetView style={{ flex: 1, zIndex: 99 }}>
          <View className="px-5 py-3 space-y-4 flex flex-col items-center">
            <CustomText className="text-2xl text-center font-semibold">
              {i18n.t("scan.ready")}
            </CustomText>
            <Image
              source={require("../assets/scan/device.png")}
              style={{ width: 108, height: 108 }}
            />
            <CustomText className="text-body text-base">
              {currentScan === "Hold"
                ? i18n.t("scan.hold")
                : currentScan === "Success"
                ? i18n.t("scan.success")
                : i18n.t("scan.failed")}
            </CustomText>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-border w-full p-3 rounded-[12px]"
            >
              <CustomText className="text-foreground text-center text-base font-medium">
                Cancel
              </CustomText>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    </SafeAreaView>
  );
}
