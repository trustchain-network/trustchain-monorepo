import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { Image, TouchableOpacity, View } from "react-native";
import HomeScreen from "./home";
import HistoryScreen from "./history";
import ProfileScreen from "./profile";
import TagsScreen from "./tags";
import ScanScreen from "./scan";
import i18n from "../lib/i18n";
import { NavigatorScreenParams } from "@react-navigation/native";
import { RootStackParamList } from "../App";
import Loading from "../components/Loading";
import useTab from "../state/tab";
import { useColorScheme } from "nativewind";

export type tabParamList = {
  Home: NavigatorScreenParams<RootStackParamList>;
  Tags: undefined;
  Scan: undefined;
  History: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<any>();

export default function MenuScreen({ navigation }: any) {
  const { loading } = useTab();
  const { colorScheme } = useColorScheme();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colorScheme === "dark" ? "#0F172A" : "#FFFFFF",
            borderTopColor: "transparent",
            height: 60,
          },
          tabBarIconStyle: { marginTop: 5 },
          tabBarLabelStyle: { marginBottom: 10 },
          tabBarActiveTintColor: "#00ACEE",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: i18n.t("menu.home"),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Tags"
          component={TagsScreen}
          options={{
            tabBarLabel: i18n.t("menu.tags"),
            tabBarIcon: ({ color, size }) => (
              <Feather name="bookmark" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Scan"
          component={ScanScreen}
          options={{
            tabBarLabel: i18n.t("menu.scan"),
            tabBarButton: ({ onPress }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate("Scan")}
                activeOpacity={0.7}
              >
                <View
                  className="bg-primary w-[60px] h-[60px] rounded-full flex items-center justify-center"
                  style={{
                    marginTop: -30,
                    elevation: 5,
                  }}
                >
                  <Image
                    style={{ width: 36, height: 36 }}
                    source={require("../assets/menu/scan.png")}
                  />
                </View>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
          options={{
            tabBarLabel: i18n.t("menu.history"),
            tabBarIcon: ({ color, size }) => (
              <Feather name="clock" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarLabel: i18n.t("menu.profile"),
            tabBarIcon: ({ color, size }) => (
              <AntDesign name="user" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
      {loading && <Loading text="Upload Image" />}
    </>
  );
}
