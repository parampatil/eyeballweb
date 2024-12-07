import axios from "axios";
import { useState } from "react";
import { FaPlay, FaSpinner, FaCheck, FaX } from "react-icons/fa6";
import { FadeText } from "@/components/ui/fade-text";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

import { useInputImageStore } from "@/store/inputImageStore";
import { useProcessedImageStore } from "@/store/processedImageStore";
import { useModelParametersStore } from "@/store/modelParametersStore";

const RunButton = ({
  setActiveTab,
}: {
  setActiveTab: (tab: string) => void;
}) => {
  const { toast } = useToast();
  const { addProcessedImage, clearProcessedImages } = useProcessedImageStore();
  const { inputImages } = useInputImageStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleRunModel = async () => {
    // Prevent multiple clicks while processing
    if (isProcessing) return;

    // check if input images are empty
    if (inputImages.length === 0) {
      toast({
        variant: "destructive",
        title: "No images to process",
        description:
          "Please upload images to process \n You will find the upload button in the Input Images tab",
        action: (
          <ToastAction
            altText="Switch to Input Images"
            onClick={() => setActiveTab("Input Images")}
          >
            Switch to Input Tab
          </ToastAction>
        ),
      });
      return;
    }

    setIsProcessing(true);
    setButtonState("loading");

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

    // Validate model parameters
    const validateParameters = () => {
      const errors = [];

      if (
        !parameters.inputImageResolution ||
        parseInt(parameters.inputImageResolution) === 0
      )
        errors.push("Input Image Resolution is required and cannot be zero.");
      if (!parameters.foveaRadius) errors.push("Fovea Radius is required.");
      if (!parameters.foveaX) errors.push("Fovea X is required.");
      if (!parameters.foveaY) errors.push("Fovea Y is required.");
      if (!parameters.peripheralConeCells)
        errors.push("Peripheral Cone Cells are required.");
      if (!parameters.foveaRodCells)
        errors.push("Fovea Rod Cells are required.");
      if (!parameters.kernelValue) errors.push("Kernel Value is required.");
      if (!parameters.peripheralSigma)
        errors.push("Peripheral Sigma is required.");
      if (!parameters.foveationType) errors.push("Foveation Type is required.");
      if (!parameters.retinalWarp) errors.push("Retinal Warp is required.");

      const resolution = parseInt(parameters.inputImageResolution);
      const foveaX = parseInt(parameters.foveaX);
      const foveaY = parseInt(parameters.foveaY);
      const foveaRadius = parseInt(parameters.foveaRadius);

      if (foveaX > resolution || foveaY > resolution)
        errors.push("Fovea location cannot be more than image resolution.");
      if (foveaRadius > resolution)
        errors.push("Fovea Radius cannot be more than image resolution.");

      return errors;
    };

    const errors = validateParameters();
    if (errors.length > 0) {
      toast({
        variant: "destructive",
        title: "Invalid Parameters",
        description: errors.join("\n"),
      });
      setIsProcessing(false);
      setButtonState("error");
      return;
    }

    const formData = new FormData();
    // Add all images and parameters to the form data
    formData.append("parameters", JSON.stringify(parameters));
    inputImages.forEach((image, index) => {
      formData.append(`inputImage_${index}`, image);
    });

    // Send POST request to the backend with all images
    axios
      .post(
        "https://eyeballflaskimagefinal-718563300949.us-central1.run.app/process",
        // "http://127.0.0.1:5000/process",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      )
      .then(async (response) => {
        if (response.status === 200) {
          // Clear processed images store
          clearProcessedImages();

          // Parse the response data
          const responseData = await response.data.text();
          const parsedData = JSON.parse(responseData);

          // Add processed images to the store
          parsedData["processedImages"].forEach((base64Image: string) => {
            addProcessedImage(base64Image);
          });

          // Switch to Processed Images tab after processing all images
          setActiveTab("Processed Images");
          setButtonState("success");

        } else {
          const errorText = await response.data.text();
          toast({
            variant: "destructive",
            title: "Processing Error",
            description: errorText || "An unknown error occurred",
          });

          setButtonState("error");
          setIsProcessing(false);
          setTimeout(() => setButtonState("idle"), 5000);
        }
      })
      .catch(async (error) => {
        let errorMessage = "An unknown error occurred";
        if (error.response && error.response.data) {
          errorMessage = await error.response.data.text();
        } else if (error.message) {
          errorMessage = error.message;
        }
        toast({
          variant: "destructive",
          title: "Processing Error",
          description: errorMessage,
        });
        setButtonState("error");
        setIsProcessing(false);
        setTimeout(() => setButtonState("idle"), 5000);
      });
    setIsProcessing(false);
    setTimeout(() => setButtonState("idle"), 5000);
  };

  return (
    <>
      <button
        onClick={handleRunModel}
        className={`flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-appaccent transition-all duration-300 ${
          buttonState === "error" ? "bg-red-500/50" : "hover:bg-appaccent/50"
        }`}
      >
        {buttonState === "loading" && (
          <>
            <FadeText direction="left" text="Loading" />{" "}
            <FaSpinner className="animate-spin m-auto" />
          </>
        )}
        {buttonState === "success" && (
          <>
            <FadeText direction="left" text=" Images Processed" />{" "}
            <FaCheck className="m-auto animate-fade duration-500" />
          </>
        )}
        {buttonState === "error" && (
          <>
            <FadeText direction="left" text="Failed" />{" "}
            <FaX className="m-auto animate-fade duration-500" />
          </>
        )}
        {buttonState === "idle" && (
          <>
            <FadeText direction="left" text="Run Model" />{" "}
            <FaPlay className="m-auto animate-fade duration-500" />
          </>
        )}
      </button>
    </>
  );
};

export default RunButton;
