import React from "react";
import { Menu } from "iconsax-react-native";
import { Button } from "./ui/button";

export default function MenuButton() {
  return (
    <Button className="rounded-full p-6" variant={"secondary"} size={"icon"}>
        <Menu size="18"  variant="Bulk"  color="#737373" />
      </Button>
  );
}
