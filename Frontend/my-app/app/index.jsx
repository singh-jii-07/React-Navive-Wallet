import { useEffect } from "react";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    // Small delay ensures RootLayout mounts first
    const timer = setTimeout(() => {
      router.replace("/(tabs)/Home");
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
