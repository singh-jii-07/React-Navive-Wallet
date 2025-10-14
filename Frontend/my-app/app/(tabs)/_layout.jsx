import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#27ae60",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: { backgroundColor: "#fff", height: 60, paddingBottom: 5 },
      }}
    >
      <Tabs.Screen name="Home" options={{ title: "Home" }} />
      <Tabs.Screen name="History" options={{ title: "History" }} />
    </Tabs>
  );
}
