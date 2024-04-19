import { View, Text, ActivityIndicator } from "react-native";

export default function Loading({ text }: { text?: string }) {
  return (
    <View
      style={{ elevation: 10 }}
      className="flex-1 absolute left-0 top-0 right-0 bottom-0 bg-black/[0.3] flex flex-col items-center justify-center space-y-5"
    >
      <ActivityIndicator size={64} color={"#00ACEE"} />
      <Text className="text-center text-white text-lg">
        {text ?? "Loading"}
      </Text>
    </View>
  );
}
