import { View, TouchableOpacity, Linking, SafeAreaView } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button } from "../components/Button";
import { Input } from "../components/Input";
import i18n from "../lib/i18n";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { RootStackParamList } from "../App";
import NfcManager, { NfcTech } from "react-native-nfc-manager";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Image } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import CustomText from "../components/CustomText";
import Header from "../components/Header";

type FormData = {
  title: string;
  url: string;
  content: string;
  authenticationMasterKey: string;
};

type Props = StackScreenProps<RootStackParamList, "Write">;

// Pre-step, call this before any NFC operations
NfcManager.start();

export default function WriteScreen({ navigation }: Props) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  // const { colorScheme } = useColorScheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      title: "",
      url: "",
      content: "",
      authenticationMasterKey: "",
    },
  });

  const [showSheet, setShowSheet] = useState(false);

  const [currentScan, setCurrentScan] = useState<"Hold" | "Success" | "Failed">(
    "Hold"
  );

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

  const onSubmit = (data: FormData) => {
    readNdef();
  };

  return (
    <SafeAreaView className="flex-1">
      <Header title="Write NFC Tags" navigation={navigation} />
      <View className="flex-1 p-3 bg-light dark:bg-dark space-y-3">
        <CustomText className="pb-2 text-sm text-body">
          {i18n.t("write.title")}
        </CustomText>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="title"
        />
        {errors.title && (
          <CustomText className="text-danger">Title is required.</CustomText>
        )}
        <CustomText className="pb-2 text-sm text-body">
          {i18n.t("write.url")}{" "}
        </CustomText>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="Enter URL"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="url"
        />
        {errors.url && (
          <CustomText className="text-danger">URL is required.</CustomText>
        )}
        <View>
          <CustomText className="pb-2 text-sm text-body">
            {i18n.t("write.content")}
          </CustomText>
          <CustomText className="pb-2">
            <CustomText>{i18n.t("write.addMoreFields")}</CustomText>{" "}
            <CustomText
              onPress={() => Linking.openURL("https://www.trustchain.com")}
              className="text-primary"
            >
              {i18n.t("write.upgrade")}
            </CustomText>
          </CustomText>
        </View>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              className="p-3"
              multiline
              textAlignVertical="top"
              numberOfLines={4}
              placeholder="Enter the contents of NFC Tags"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="content"
        />
        {errors.content && (
          <CustomText className="text-danger">Content is required.</CustomText>
        )}
        <CustomText className="pb-2 text-sm text-body">
          {i18n.t("write.authentication")}
        </CustomText>
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 100,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              placeholder="000000000000000000000000000000"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="authenticationMasterKey"
        />
        {errors.authenticationMasterKey && (
          <CustomText className="text-danger">
            Authentication master key is required.
          </CustomText>
        )}
        <Button label="Write NFC Tags" onPress={handleSubmit(onSubmit)} />
      </View>
      {showSheet && (
        <View className="absolute left-0 top-0 right-0 bottom-0 bg-black/[0.5]"></View>
      )}
      <BottomSheet
        style={{ zIndex: 99 }}
        snapPoints={[350]}
        ref={bottomSheetRef}
        index={showSheet ? 0 : -1}
        enablePanDownToClose
        onChange={handleSheetChanges}
        onClose={() => setShowSheet(false)}
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
