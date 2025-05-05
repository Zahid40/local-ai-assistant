import { View, Text } from "react-native";
import React, { useState } from "react";
import { Link, Stack } from "expo-router";
import MenuButton from "😎/components/MenuButton";
import { Button } from "😎/components/ui/button";
import { CpuSetting } from "iconsax-react-native";
import {
  SelectActiveModel,
  SelectActiveModelButton,
} from "😎/components/selectActiveModel";
import BottomSheet from "@gorhom/bottom-sheet";

const index = () => {
  const sheetRef = React.useRef<BottomSheet>(null);
  const [activeModel, setActiveModel] = useState<string | null>(null);
  return (
    <>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <MenuButton />,
          headerTitle: () => (
            <View className="px-4 py-2">
              <SelectActiveModelButton sheetRef={sheetRef} />
            </View>
          ),
          headerRight: () => (
            <Link href="/setting" asChild>
              <Button
                className="rounded-full  p-6"
                variant={"secondary"}
                size={"icon"}
              >
                <CpuSetting size="18" variant="Bulk" color="#737373" />
              </Button>
            </Link>
          ),
        }}
      />
      <View className="flex-1">
        <Text>index</Text>
        <SelectActiveModel
          sheetRef={sheetRef}
          activeModel={activeModel}
          setActiveModel={setActiveModel}
        />
      </View>
    </>
  );
};

export default index;
