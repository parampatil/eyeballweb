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
  const { processedImages, addProcessedImage, clearProcessedImages } =
    useProcessedImageStore();

  const handleRunModel = async () => {
    // Get model parameters from the store
    const modelParameters = useModelParametersStore.getState();

    // Prepare model parameters with defaults
    const parameters = {
      inputImageResolution: modelParameters.inputImageResolution.toString(),
      foveaRadius: modelParameters.foveaRadius.toString(),
      foveaX: modelParameters.foveaX.toString(),
      foveaY: modelParameters.foveaY.toString(),
      peripheralConeCells: modelParameters.peripheralConeCells.toString(),
      foveaRodCells: modelParameters.foveaRodCells.toString(),
      isPeripheralBlurEnabled:
        modelParameters.isPeripheralBlurEnabled.toString(),
      kernelValue: modelParameters.kernelValue,
      peripheralSigma: modelParameters.peripheralSigma.toString(),
      isPeripheralGrayscale: modelParameters.isPeripheralGrayscale.toString(),
      foveationType: modelParameters.foveationType.toString(),
      retinalWarp: modelParameters.retinalWarp.toString(),
    };

    try {
      const formData = new FormData();
      formData.append("parameters", JSON.stringify(parameters));
      inputImages.forEach((image, index) => {
        formData.append(`inputImage_${index}`, image);
      });

      console.log("Sending request with formData:", formData);

      // Send POST request to the backend with all images
      const response = await axios.post(
        // "https://eyeballflaskimagefinal-718563300949.us-central1.run.app/process",
        "http://127.0.0.1:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Expecting a blob response for images
        }
      );

      if (response.status === 200) {
        // Clear processed images store
        clearProcessedImages();
        const responseData = await response.data.text();
        const parsedData = JSON.parse(responseData);

        parsedData["processedImages"].forEach((base64Image: string) => {
          addProcessedImage(base64Image);
        });
      }
      console.log(processedImages);

      // Switch to Processed Images tab after processing all images
      setActiveTab("Processed Images");
    } catch (error) {
      console.error("Error processing images:", error);
    }
  };

  // const handleRunModel = () => {
  //   // Get model parameters from the store
  //   const modelParameters = useModelParametersStore.getState();
  //   console.log("Model Parameters:", modelParameters);

  //   // Clear processed images store
  //   clearProcessedImages();

  //   // copy input images to processed images
  //   inputImages.forEach((image) => addProcessedImage(image));

  //   // Switch to Processed Images tab
  //   setActiveTab("Processed Images");
  // };

  return (
    <button
      onClick={handleRunModel}
      className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-appaccent hover:bg-appaccent/50 transition duration-300"
    >
      Run Model <FaPlay className="m-auto" />
    </button>
  );
};

export default RunButton;
