import { ReactNode } from "react";
import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

interface CustomTextProps extends TextProps {
  children: string | ReactNode;
}

export default function CustomText({
  children,
  className,
  ...props
}: CustomTextProps) {
  return (
    <Text
      {...props}
      className={twMerge(
        "text-foreground dark:text-foreground-dark",
        className
      )}
    >
      {children}
    </Text>
  );
}
