// src/components/Bottombar.tsx
import { FaDownload } from 'react-icons/fa6';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { useProcessedImageStore } from '../store/processedImageStore';

const Bottombar = () => {
  const { processedImages } = useProcessedImageStore();

  const handleDownloadImages = async () => {
    const zip = new JSZip();

    // Add each processed image to the ZIP file
    processedImages.forEach((image, index) => {
      zip.file(`processed-image-${index + 1}.jpg`, image);
    });

    // Generate the ZIP file and trigger download
    const content = await zip.generateAsync({ type: 'blob' });
    saveAs(content, 'processed-images.zip');
  };

  return (
    <div className="p-2 m-2 border border-gray-400 rounded">
      <button
        onClick={handleDownloadImages}
        className="flex justify-center align-middle text-center gap-2 p-2 font-semibold rounded border border-primary hover:bg-primary hover:text-black transition duration-300"
      >
        <FaDownload className="m-auto" /> Download Images
      </button>
    </div>
  );
};

export default Bottombar;