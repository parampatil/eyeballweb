import { FaImages } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";

import { useInputImageStore } from "@/store/inputImageStore";
import { useProcessedImageStore } from "@/store/processedImageStore";

const LoadDataset = () => {
  const {inputImages, addInputImage, clearInputImages} = useInputImageStore();
  const {addProcessedImage, clearProcessedImages} = useProcessedImageStore();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      Array.from(event.target.files).forEach((file) => addInputImage(file));
    }
  };

  const handleInputImageClear = () => {
    clearInputImages();
  };

  const handleOutputImageClear = () => {
    clearProcessedImages();
  };

  const handleRunModel = () => {
    // Clear processed images store
    clearProcessedImages();

    // Copy input images to processed images store
    inputImages.forEach((image) => addProcessedImage(image));
  };

  return (
    <div className="flex flex-col gap-2 border border-gray-400 m-2 p-2 rounded">
      <div className="flex-1">
        <h1 className="text-xs">LoadDataset</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-4">
          <label className="flex items-center justify-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300 cursor-pointer">
            <FaImages className="m-auto" />
            <span>Load Images</span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            onClick={handleInputImageClear}
            className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300"
          >
            <FaBan className="m-auto" />
            Clear Input Images
          </button>
          <button
            onClick={handleOutputImageClear}
            className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300"
          >
            <FaBan className="m-auto" />
            Clear Processed Images
          </button>
        </div>
        <button onClick={handleRunModel} className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300">
          Run Model <FaPlay className="m-auto" />
        </button>
      </div>
    </div>
  );
};

export default LoadDataset;
