import { useState } from "react";
import { fileToDataURL } from "@/Utils/fileToDataURL";

export function useBlogImageState() {
  const [image_Header, setImage_Header] = useState<string>("");
  const [image_Body, setImage_Body] = useState<string>("");

  const handle_ImageHeader = async (file: File) => {
    try {
      const dataURL = await fileToDataURL(file);
      setImage_Header(dataURL);
    } catch (error) {
      console.error("Image Header Error:", error);
    }
  };
  const handle_ImageBody = async (file: File) => {
    try {
      const dataURL = await fileToDataURL(file);
      setImage_Body(dataURL);
    } catch (error) {
      console.error("Image Body Error:", error);
    }
  };

  return { image_Header, handle_ImageHeader, image_Body, handle_ImageBody };
}
