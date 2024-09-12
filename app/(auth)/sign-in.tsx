import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignUp = () => {
  const onSignInPress = () => {};
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-VazirmatnSemiBold absolute bottom-5 right-5">
            ورود به حساب کاربری👋
          </Text>
        </View>
        <View className="p-5">
          <InputField
            placeholder="name@email.com"
            label="ایمیل"
            icon={icons.email}
            className="text-right"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            placeholder={`رمز عبور خود را وارد کنید`}
            label="رمزعبور"
            icon={icons.lock}
            className="text-right"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            secureTextEntry={true}
          />
          <CustomButton title="ورود" onPress={onSignInPress} className="mt-6" />
          <OAuth />
          <Link
            href="/sign-up"
            className="text-lg text-center text-general-200 mt-10"
          >
            <Text>ثبت نام نکرده‌اید؟</Text>
            <Text className="text-primary-500"> ثبت نام</Text>
          </Link>
        </View>
        {/* Modal Verification */}
      </View>
    </ScrollView>
  );
};

export default SignUp;
