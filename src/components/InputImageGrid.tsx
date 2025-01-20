import { useState } from "react";
import { useInputImageStore } from "../store/inputImageStore";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FadeText } from "@/components/ui/fade-text";

const ImageGrid = () => {
  const { inputImages, removeInputImage } = useInputImageStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const imagesPerPage = 10;
  const totalPages = Math.ceil(inputImages.length / imagesPerPage);
  const [imageDimensions, setImageDimensions] = useState<string | null>(null);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * imagesPerPage;
  const selectedImages = inputImages.slice(
    startIndex,
    startIndex + imagesPerPage
  );

  const calculateImageDimensions = (image: File): Promise<string> => {
    return new Promise((resolve) => {
      const img = document.createElement("img");
      img.src = URL.createObjectURL(image);
      img.onload = () => {
        resolve(img.width + " x " + img.height);
      };
    });
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 p-4">
        {selectedImages.length === 0 && (
          <div className="col-span-full text-center m-auto">
            No images to display
          </div>
        )}
        {selectedImages.map((image, index) => (
          <div
            key={startIndex + index}
            className="h-fit border border-disabled rounded-md overflow-hidden relative group"
          >
            <Dialog>
              <DialogTrigger asChild>
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Image ${startIndex + index + 1}`}
                  onClick={async () => {
                    setSelectedImage(URL.createObjectURL(image));
                    const dimensions = await calculateImageDimensions(image);
                    setImageDimensions(dimensions);
                  }}
                />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="me-5 flex justify-between">
                    <FadeText direction="left" text="Preview Input Image" />
                    <span className="text-appaccent animate-fade duration-500">
                      {imageDimensions}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt={`Selected Image`}
                      className="w-full h-auto rounded"
                    />
                  )}
                </DialogDescription>
              </DialogContent>
            </Dialog>
            <button
              onClick={() => removeInputImage(startIndex + index)}
              className="scale-0 absolute top-0 right-0 m-1 w-8 h-8 bg-red-500 text-white text-lg rounded-full group-hover:scale-100 transform transition duration-300"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      {selectedImages.length != 0 && (
        <div className="text-black flex justify-between">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-slate-300 rounded disabled:opacity-50 hover:-translate-y-1 hover:bg-slate-300/80 hover:shadow-white transition-all duration-300"
          >
            Previous
          </button>
          <span className="dark:text-appaccent">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-slate-300 rounded disabled:opacity-50 hover:-translate-y-1 hover:bg-slate-300/80 hover:shadow-white transition-all duration-300"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageGrid;
