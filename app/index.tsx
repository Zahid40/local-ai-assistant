import { View, Text, Platform, KeyboardAvoidingView } from "react-native";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link, Stack } from "expo-router";
import MenuButton from "😎/components/MenuButton";
import { Button } from "😎/components/ui/button";
import { CpuSetting } from "iconsax-react-native";
import {
  SelectActiveModel,
  SelectActiveModelButton,
  SelectActiveModelSheetRef,
} from "😎/components/selectActiveModel";
import { GiftedChat, IMessage } from "react-native-gifted-chat";

const index = () => {
  const sheetRef = useRef<SelectActiveModelSheetRef>(null);
  const [activeModel, setActiveModel] = useState<any | null>(null);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages: any) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  return (
    <>
      <Stack.Screen
        name="index"
        options={{
          headerLeft: () => <MenuButton />,
          headerTitle: () => (
            <View className="px-4 py-2">
              <SelectActiveModelButton
                sheetRef={sheetRef}
                activeModel={activeModel}
                setActiveModel={setActiveModel}
              />
            </View>
          ),
          headerRight: () => (
            <Link href="/setting" asChild>
              <Button
                className="rounded-full p-6"
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
        <GiftedChat
          isKeyboardInternallyHandled={false} // Disable built-in keyboard handling
          messages={messages}
          onSend={(messages) => onSend(messages)}
          user={{
            _id: 1,
          }}
        />
        {Platform.OS === "android" && (
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={80} // Adjust this value based on your UI
          />
        )}

        <SelectActiveModel
          ref={sheetRef}
          activeModel={activeModel}
          setActiveModel={setActiveModel}
        />
      </View>
    </>
  );
};

export default index;
