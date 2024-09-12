import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const onSignUpPress = () => {};
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-VazirmatnSemiBold absolute bottom-5 right-5">
            ساخت حساب کاربری
          </Text>
        </View>
        <View className="p-5">
          <InputField
            placeholder="شاهین حیدری..."
            label="نام"
            icon={icons.person}
            className="text-right"
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            placeholder="name@email.com"
            label="ایمیل"
            icon={icons.email}
            className="text-right"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            placeholder={`حداقل 8 رقم`}
            label="رمزعبور"
            icon={icons.lock}
            className="text-right"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />
          <CustomButton
            title="ثبت نام"
            onPress={onSignUpPress}
            className="mt-6"
          />
          <OAuth />
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>قبلا عضو شده‌اید؟</Text>
            <Text className="text-primary-500"> ورود</Text>
          </Link>
        </View>
        {/* Modal Verification */}
      </View>
    </ScrollView>
  );
};

export default SignUp;
