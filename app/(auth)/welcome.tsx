import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import CustomButton from "@/components/CustomButton";

const Onboarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex-1 items-center justify-between">
      <TouchableOpacity
        onPress={() => router.replace("/(auth)/sign-up")}
        className="w-full justify-end flex-row-reverse items-center p-5"
      >
        <Text className="font-VazirmatnBold text-black text-md ">رد شدن</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={
          <View className="w-[26px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full" />
        }
        activeDot={
          <View className="w-[40px] h-[4px] mx-1 bg-[#0286ff] rounded-full" />
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              className="w-full h-[300px]"
              source={item.image}
              resizeMode="contain"
            />
            <View className="flex flex-row items-center justify-center w-full mt-10">
              <Text className="text-center text-black text-3xl font-bold mx-10 font-VazirmatnBold">
                {item.title}
              </Text>
            </View>
            <Text className="text-lg font-VazirmatnSemiBold text-center text-[#858585] mx-10 mt-3">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "ورود" : "بعدی"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
        className="w-11/12 mt-8 mb-5"
      />
    </SafeAreaView>
  );
};

export default Onboarding;
