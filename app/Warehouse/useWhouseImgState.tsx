import { useState } from "react";
import { fileToDataURL } from "@/Utils/fileToDataURL";

export const useWarehouseImgState = () => {
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const handleImgChange = async (file: File) => {
    try {
      const dataUrl = await fileToDataURL(file);
      setImgUrl(dataUrl);
    } catch (error) {
      console.error("Error occurred while processing the image file:", error);
    }
  };

  return { imgUrl, handleImgChange };
};
