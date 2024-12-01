import { FaImages } from "react-icons/fa";
import { FaBan } from "react-icons/fa";

import { useInputImageStore } from "@/store/inputImageStore";
import { useProcessedImageStore } from "@/store/processedImageStore";

import RunButton from "./RunButton";

const LoadDataset = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const { inputImages, addInputImage, clearInputImages } = useInputImageStore();
  const { clearProcessedImages } = useProcessedImageStore();

  const handleLoadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) => addInputImage(file));
    }

    // Switch to Input Images tab
    setActiveTab("Input Images");
  };

  const handleLoadDefaultDataset = async () => {
    // Clear input images store
    clearInputImages();

    // Assuming the images are stored in src/assets/images/DefaultDataset
    const images = import.meta.glob("@/assets/images/DefaultDataset/*.png", {
      eager: true,
    });

    // Convert the imported modules to File objects if needed
    Object.values(images).forEach((module) => {
      // The module is an object with a default property containing the URL
      const imageUrl = (module as { default: string }).default;

      fetch(imageUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const fileName = imageUrl.split("/").pop() || "image.png";
          const file = new File([blob], fileName, { type: blob.type });
          addInputImage(file);
        });
    });

    // Switch to Input Images tab
    setActiveTab("Input Images");
  };

  const handleInputImageClear = () => {
    clearInputImages();
  };

  const handleOutputImageClear = () => {
    clearProcessedImages();
  };

  

  return (
    <div className="flex flex-col gap-2 border border-gray-400 m-2 p-2 rounded">
      <div className="flex-1">
        <h1 className="text-xs">LoadDataset</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          {inputImages.length === 0 ? (
            <>
              <label className="flex items-center justify-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300 cursor-pointer">
                <FaImages className="m-auto" />
                <span>Load Images</span>
                <input
                  type="file"
                  multiple
                  onChange={handleLoadImage}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleLoadDefaultDataset}
                className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300"
              >
                Load Default dataset
              </button>
            </>
          ) : activeTab === "Input Images" ? (
            <button
              onClick={handleInputImageClear}
              className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300"
            >
              <FaBan className="m-auto" />
              Clear Input Images
            </button>
          ) : (
            <button
              onClick={handleOutputImageClear}
              className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300"
            >
              <FaBan className="m-auto" />
              Clear Processed Images
            </button>
          )}
        </div>
        <RunButton setActiveTab={setActiveTab} />
      </div>
    </div>
  );
};

export default LoadDataset;
