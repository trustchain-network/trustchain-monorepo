import { SafeAreaView } from "react-native-safe-area-context";
import CustomText from "../components/CustomText";

export default function NotificationsScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-light dark:bg-dark">
      <CustomText>Notifications Screen</CustomText>
    </SafeAreaView>
  );
}
