import React, { useRef, useMemo, forwardRef, useImperativeHandle } from "react";
import { View, Text, Pressable } from "react-native";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { ArrowDown2, TickCircle } from "iconsax-react-native";
import { cn } from "😎/lib/utils";
import { useQuery } from "@tanstack/react-query";

export type SelectActiveModelSheetRef = {
  open: () => void;
  close: () => void;
};

type Props = {
  activeModel: any | null;
  setActiveModel: (model: any) => void;
  title?: string;
};

export const SelectActiveModelButton = ({
  sheetRef,
  title = "Select Active Model",
  activeModel,
  setActiveModel,
}: {
  sheetRef: React.RefObject<SelectActiveModelSheetRef>;
  title?: string;
  activeModel: any | null;
  setActiveModel: (model: any) => void;
}) => {
  return (
    <Button
      onPress={() => sheetRef.current?.open()}
      className="rounded-full flex-row items-center justify-between gap-2 "
      variant={"default"}
    >
      <Avatar alt={activeModel ?? title + "_avatar"} className="size-6">
        {/* <AvatarImage source={{ uri: GITHUB_AVATAR_URI }} /> */}
        <AvatarFallback>
          <Text className="text-xs font-semibold ">
            {activeModel?.slice(0, 1) ?? title?.slice(0, 1)}
          </Text>
        </AvatarFallback>
      </Avatar>
      <Text className="text-sm text-background">{activeModel ?? title}</Text>
      <ArrowDown2 size="18" color="#707070" variant="TwoTone" />
    </Button>
  );
};

export const SelectActiveModel = forwardRef<SelectActiveModelSheetRef, Props>(
  ({ activeModel, setActiveModel, title = "Select Active Model" }, ref) => {
    const internalSheetRef = useRef<BottomSheet>(null);

    useImperativeHandle(ref, () => ({
      open: () => internalSheetRef.current?.expand(),
      close: () => internalSheetRef.current?.close(),
    }));

    const snapPoints = useMemo(() => ["25%", "50%"], []);
    const {
      data: models = [],
      isLoading,
      isError,
      error,
    } = useQuery({
      queryKey: ["models"],
      queryFn: async () => {
        const response = await fetch(`${OLLAMA_SERVER}/api/tags`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        return data.models; // Return just the array
      }
      ,
    });
    console.log("models", models);
    

    return (
      <BottomSheet
        ref={internalSheetRef}
        index={-1}
        snapPoints={snapPoints}
        style={{
          backgroundColor: "#404040",
          borderRadius: 26,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 7,
        }}
      >
        <BottomSheetView className="">
          <Text className="text-lg text-center font-semibold text-neutral-700">
            {title}
          </Text>
          {isLoading && (
            <View className="flex-1 items-center justify-center">
              <Text className="text-sm text-neutral-700">Loading...</Text>
            </View>
          )}
          {isError && (
            <View className="flex-1 items-center justify-center">
              <Text className="text-sm text-neutral-700">
                Error: {error.message}
              </Text>
            </View>
          )}

          <View className="flex flex-wrap  p-4 gap-2">
            {models.map((model: any) => {
              const isActiveModel = model.model === activeModel?.model;
              return (
                <Button
                  key={model.model}
                  onPress={() => {
                    setActiveModel(model);
                    internalSheetRef.current?.close(); // ✅ Close internally
                  }}
                  className="rounded-full flex-row  items-start grow-0 shrink-0  gap-2 "
                  variant={isActiveModel ? "default" : "outline"}
                >
                  <Text
                    className={cn(
                      isActiveModel ? "text-background" : "",
                      "text-sm"
                    )}
                  >
                    {model.model}
                  </Text>
                  {isActiveModel && (
                    <TickCircle size="18" color="#777777" variant="TwoTone" />
                  )}
                </Button>
              );
            })}
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);
