import { View, Text } from "react-native";
import React from "react";
import { Button } from "./ui/button";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";

export default function BackButton() {
  const router = useRouter();
  return (
    <Button
      className="rounded-full  p-6"
      variant={"secondary"}
      size={"icon"}
      onPress={() => router.back()}
    >
      <ArrowLeft size="18" color="#737373" />
    </Button>
  );
}
