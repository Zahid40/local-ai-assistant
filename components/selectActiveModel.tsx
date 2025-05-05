import React, { useRef, useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Button } from "./ui/button";

type Props = {
  sheetRef: React.RefObject<BottomSheet>;
  onPress?: () => void;
  title?: string;
  [key: string]: any;
};

export function SelectActiveModelButton({
  sheetRef,
  title = "Select Active Model",
}: Props) {
  return (
    <Button
      onPress={() => sheetRef.current?.expand()}
      className="rounded-full"
      variant={"secondary"}
    >
      <Text>{title}</Text>
    </Button>
  );
}

export function SelectActiveModel({
  sheetRef,
  activeModel,
  setActiveModel,
  title = "Select Active Model",
}: {
  sheetRef: React.RefObject<BottomSheet>;
  activeModel: string | null;
  setActiveModel: (model: string) => void;
  title?: string;
}) {
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  const models = ["GPT-4", "GPT-3.5", "Claude 3", "Llama 3"]; // Example models

  return (
    <BottomSheet ref={sheetRef} index={-1} snapPoints={snapPoints}>
      <View style={{ padding: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{title}</Text>
        {models.map((model) => (
          <Pressable
            key={model}
            onPress={() => {
              setActiveModel(model);
              sheetRef.current?.close();
            }}
            style={{
              paddingVertical: 10,
              borderBottomWidth: 1,
              borderBottomColor: "#ddd",
            }}
          >
            <Text style={{ color: model === activeModel ? "#007AFF" : "#000" }}>
              {model} {model === activeModel ? "(Selected)" : ""}
            </Text>
          </Pressable>
        ))}
      </View>
    </BottomSheet>
  );
}
