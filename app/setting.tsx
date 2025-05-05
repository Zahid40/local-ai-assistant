import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { CpuSetting } from "iconsax-react-native";
import BackButton from "😎/components/backButton";

const setting = () => {
  return (
    <>
      <Stack.Screen
        name="setting"
        options={{
          title: "Settings",
          headerLeft: () => <BackButton />,
          headerTitle: () => (
            <View className="px-4 py-2 items-center justify-center gap-2 flex-row">
              <CpuSetting size="18" variant="Bulk" color="#737373" />
              <Text className="text-lg font-bold">Settings</Text>
            </View>
          ),
          headerRight: () => <View className="size-12 " />,
        }}
      />

      <View>
        <Text>setting</Text>
      </View>
    </>
  );
};

export default setting;
