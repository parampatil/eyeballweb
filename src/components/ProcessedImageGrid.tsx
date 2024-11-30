import { useState } from 'react';

// Assuming you have a store or some way to manage processed images
import { useProcessedImageStore } from '@/store/processedImageStore';

const ProcessedImageGrid = () => {
  const { processedImages } = useProcessedImageStore();

  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;
  const totalPages = Math.ceil(processedImages.length / imagesPerPage);

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
  const selectedImages = processedImages.slice(startIndex, startIndex + imagesPerPage);

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
              alt={`Processed Image ${startIndex + index + 1}`}
              className="w-full h-full object-cover"
            />
            <a
              href={URL.createObjectURL(image)}
              download={`processed-image-${startIndex + index + 1}.jpg`}
              className="absolute bottom-0 right-0 m-1 scale-0 group-hover:scale-100 bg-blue-500 text-white rounded p-1 transition-transform duration-300"
            >
              Download
            </a>
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

export default ProcessedImageGrid;