import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    "Vazirmatn-Black": require("../assets/fonts/Vazirmatn-Black.ttf"),
    "Vazirmatn-Bold": require("../assets/fonts/Vazirmatn-Bold.ttf"),
    "Vazirmatn-ExtraBold": require("../assets/fonts/Vazirmatn-ExtraBold.ttf"),
    "Vazirmatn-ExtraLight": require("../assets/fonts/Vazirmatn-ExtraLight.ttf"),
    "Vazirmatn-Light": require("../assets/fonts/Vazirmatn-Light.ttf"),
    "Vazirmatn-Medium": require("../assets/fonts/Vazirmatn-Medium.ttf"),
    "Vazirmatn-Regular": require("../assets/fonts/Vazirmatn-Regular.ttf"),
    "Vazirmatn-SemiBold": require("../assets/fonts/Vazirmatn-SemiBold.ttf"),
    "Vazirmatn-Thin": require("../assets/fonts/Vazirmatn-Thin.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* <Stack.Screen name="(root)" options={{ headerShown: false }} /> */}
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
