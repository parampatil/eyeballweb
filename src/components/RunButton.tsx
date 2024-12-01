import axios from "axios";
import { FaPlay } from "react-icons/fa6";

import { useInputImageStore } from "@/store/inputImageStore";
import { useProcessedImageStore } from "@/store/processedImageStore";
import { useModelParametersStore } from "@/store/modelParametersStore";

const RunButton = ({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) => {
  const { inputImages } = useInputImageStore();
  const { addProcessedImage, clearProcessedImages } = useProcessedImageStore();
  const modelParameters = useModelParametersStore.getState();

  //   const handleRunModel = async () => {
  //     // Clear processed images store
  //     clearProcessedImages();

  //     // Default values for parameters not in the store
  //     const defaultValues = {
  //       fovea_type: "default",
  //       verbose: false,
  //       multiprocessing: false,
  //       num_cores: 1,
  //       retinal_warp: false,
  //       peripheral_gaussian_sigma: 0,
  //     };

  //     // Prepare model parameters with defaults
  //     const parameters = {
  //       fovea_radius: modelParameters.foveaRadius.toString(),
  //       peripheral_cone_cells: modelParameters.peripheralConeCells.toString(),
  //       fovea_rod_cells: modelParameters.foveaRodCells.toString(),
  //       peripheral_blur_enabled: modelParameters.isPeripheralBlurEnabled.toString(),
  //       kernel_value: modelParameters.kernelValue,
  //       input_image_resolution: modelParameters.inputImageResolution.toString(),
  //       peripheral_sigma: modelParameters.peripheralSigma.toString(),
  //       peripheral_grayscale: modelParameters.isPeripheralGrayscale.toString(),
  //       fovea_x: modelParameters.foveaX.toString(),
  //       fovea_y: modelParameters.foveaY.toString(),
  //       ...defaultValues,
  //     };

  //     try {
  //       // Process each image individually
  //       for (let i = 0; i < inputImages.length; i++) {
  //         const formData = new FormData();
  //         formData.append("file", inputImages[i], `image_${i}.png`);
  //         Object.entries(parameters).forEach(([key, value]) => {
  //           formData.append(key, value);
  //         });

  //         // Send POST request to the backend for each image
  //         const response = await axios.post(
  //           "https://eyeballflaskimagefinal-718563300949.us-central1.run.app/process",
  //           formData,
  //           {
  //             headers: {
  //               "Content-Type": "multipart/form-data",
  //             },
  //             responseType: 'blob', // Expecting a blob response for images
  //           }
  //         );

  //         if (response.status === 200) {
  //           const file = new File([response.data], `processed_image_${i}.png`, { type: response.data.type });
  //           addProcessedImage(file);
  //         }
  //       }

  //       // Switch to Processed Images tab after processing all images
  //       setActiveTab('Processed Images');
  //     } catch (error) {
  //       console.error("Error processing images:", error);
  //     }
  //   };

  const handleRunModel = () => {
    // Clear processed images store
    clearProcessedImages();

    // copy input images to processed images
    inputImages.forEach((image) => addProcessedImage(image));

    // Switch to Processed Images tab
    setActiveTab("Processed Images");
  };

  return (
    <button
      onClick={handleRunModel}
      className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300"
    >
      Run Model <FaPlay className="m-auto" />
    </button>
  );
};

export default RunButton;
