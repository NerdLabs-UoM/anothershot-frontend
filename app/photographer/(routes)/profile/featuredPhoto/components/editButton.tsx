import Image from "next/image";
import React from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";

const EditButton = () => {
  return (
    <Button variant={"outline"} size={"icon"}>
      <Pencil />
    </Button>
  );
};

export default EditButton;
