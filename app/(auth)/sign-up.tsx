import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { icons, images } from "@/constants";
import InputField from "@/components/InputField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import OAuth from "@/components/OAuth";
import { useSignUp } from "@clerk/clerk-expo";
import ReactNativeModal from "react-native-modal";
import { fetchAPI } from "@/lib/fetch";

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setVerification({
        ...verification,
        state: "pending",
        error: "",
        code: "",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (completeSignUp.status === "complete") {
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            clerkId: completeSignUp.createdUserId,
          }),
        });
        await setActive({ session: completeSignUp.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "کد وارد شده اشتباه است",
        });
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
    }
  };
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
            sub="لطفا از حروف بزرگ ، کوچک ، اعداد و علائم استفاده کنید"
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
        <ReactNativeModal isVisible={showSuccessModal}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-5"
              resizeMode="contain"
            />
            <Text className="text-3xl text-center text-general-900 font-VazirmatnBold">
              تبریک
            </Text>
            <Text className="text-base text-gray-400 font-VazirmatnMedium text-center mt-2">
              حساب کاربری شما با موفقیت ایجاد شد
            </Text>
            <CustomButton
              title="ورود"
              onPress={() => router.push("/(root)/(tabs)/home")}
              className="mt-5"
            />
          </View>
        </ReactNativeModal>
        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() => {
            if (verification.state === "success") setShowSuccessModal(true);
          }}
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-VazirmatnExtraBold mb-2">
              احراز هویت
            </Text>
            <Text className="font-VazirmatnMedium mb-5">
              یک کد احراز هویت به {form.email} ارسال شد.
            </Text>
            <InputField
              label="کد"
              icon={icons.lock}
              placeholder="123456"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />
            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}
            <CustomButton
              title="تایید"
              onPress={onPressVerify}
              className="mt-5 bg-success-500"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUp;
