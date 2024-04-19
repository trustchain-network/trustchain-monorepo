import { type ClassValue, clsx } from "clsx";
import Toast from "react-native-toast-message";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function showToast({
  type,
  title,
  subtitle,
}: {
  type: "success" | "error" | "info";
  title: string;
  subtitle: string;
}) {
  Toast.show({
    type,
    text1: title,
    text1Style: { fontSize: 16 },
    text2: subtitle,
  });
}
