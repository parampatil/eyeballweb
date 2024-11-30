import { useState } from "react";
import { useInputImageStore } from "../store/inputImageStore";

const ImageGrid = () => {
  const { inputImages, removeInputImage } = useInputImageStore();

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;
  const totalPages = Math.ceil(inputImages.length / imagesPerPage);

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
  const selectedImages = inputImages.slice(startIndex, startIndex + imagesPerPage);

  return (
    <div>
      <div className="grid grid-cols-5 gap-2 p-4">
        {selectedImages.map((image, index) => (
          <div
            key={startIndex + index}
            className="border border-disabled rounded-md overflow-hidden relative group"
          >
            <img
              src={URL.createObjectURL(image)}
              alt={`Image ${startIndex + index + 1}`}
              className="w-full h-full object-cover"
            />
            <button
              onClick={() => removeInputImage(startIndex + index)}
              className="scale-0 absolute top-0 right-0 m-1 w-8 h-8 bg-red-500 text-white text-lg rounded-full group-hover:scale-100 transform transition duration-300"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ImageGrid;
