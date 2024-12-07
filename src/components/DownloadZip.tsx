// src/components/Bottombar.tsx
import { FaDownload } from "react-icons/fa6";
import { FadeText } from "@/components/ui/fade-text";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import { useProcessedImageStore } from "../store/processedImageStore";

const DownloadZip = () => {
  const { processedImages } = useProcessedImageStore();

  const handleDownloadImages = async () => {
    const zip = new JSZip();

    // Add each processed image to the ZIP file
    processedImages.forEach((image, index) => {
      zip.file(`processed-image-${index + 1}.png`, image);
    });

    // Generate the ZIP file and trigger download
    const content = await zip.generateAsync({ type: "blob" });
    saveAs(content, "processed-images.zip");
  };

  return (
    <button
      onClick={handleDownloadImages}
      className="flex justify-around items-center gap-2 p-2 font-semibold rounded border border-appaccent hover:bg-appaccent/50 transition duration-300"
    >
      <FaDownload className="animate-fade duration-500" />
      <FadeText direction="left" text="Download Images Zip" />
    </button>
  );
};

export default DownloadZip;
