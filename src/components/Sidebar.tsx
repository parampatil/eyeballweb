import { useModelParametersStore } from '@/store/modelParametersStore';
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

const Sidebar = () => {
  const {
    inputImageResolution,
    foveaX,
    foveaY,
    foveaRadius,
    peripheralConeCells,
    foveaRodCells,
    isPeripheralBlurEnabled,
    kernelValue,
    peripheralSigma,
    isPeripheralGrayscale,
    setParameter
  } = useModelParametersStore();


  return (
    <aside className="w-80 border rounded border-gray-400 m-2 p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Model Parameters</h2>

      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Input Image Resolution (px)</label>
          </TooltipTrigger>
          <TooltipContent>Enter the resolution for input images in pixels.</TooltipContent>
        </Tooltip>
        <input
          type="number"
          value={inputImageResolution}
          onChange={(e) => setParameter('inputImageResolution', Math.max(1, parseInt(e.target.value) || 1))}
          className="w-full mt-1 p-2 border border-gray-800 rounded text-gray-800"
        />
      </div>

      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Fovea Location (x, y)</label>
          </TooltipTrigger>
          <TooltipContent>Specify the x and y coordinates for the fovea location.</TooltipContent>
        </Tooltip>
        <div className="flex gap-2">
          <input
            type="number"
            value={foveaX}
            onChange={(e) => setParameter('foveaX', Math.min(inputImageResolution, parseInt(e.target.value) || 0))}
            className="w-full mt-1 p-2 border border-gray-800 rounded text-gray-800"
            placeholder="x"
          />
          <input
            type="number"
            value={foveaY}
            onChange={(e) => setParameter('foveaY', Math.min(inputImageResolution, parseInt(e.target.value) || 0))}
            className="w-full mt-1 p-2 border border-gray-800 rounded text-gray-800"
            placeholder="y"
          />
        </div>
      </div>

      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Fovea Radius: {foveaRadius}</label>
          </TooltipTrigger>
          <TooltipContent>Adjust the radius of the fovea area.</TooltipContent>
        </Tooltip>
        <input
          type="range"
          min={0}
          max={inputImageResolution}
          value={foveaRadius}
          onChange={(e) => setParameter('foveaRadius', parseInt(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Peripheral Active Cone Cells (%): {peripheralConeCells}</label>
          </TooltipTrigger>
          <TooltipContent>Set the percentage of active cone cells in the periphery.</TooltipContent>
        </Tooltip>
        <input
          type="range"
          min={0}
          max={100}
          value={peripheralConeCells}
          onChange={(e) => setParameter('peripheralConeCells', parseInt(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Fovea Active Rod Cells (%): {foveaRodCells}</label>
          </TooltipTrigger>
          <TooltipContent>Set the percentage of active rod cells in the fovea.</TooltipContent>
        </Tooltip>
        <input
          type="range"
          min={0}
          max={100}
          value={foveaRodCells}
          onChange={(e) => setParameter('foveaRodCells', parseInt(e.target.value))}
          className="w-full mt-1"
        />
      </div>

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={isPeripheralBlurEnabled}
          onChange={(e) => setParameter('isPeripheralBlurEnabled', e.target.checked)}
          className="mr-2"
        />
        <label>Peripheral Gaussian Blur</label>
      </div>

      {isPeripheralBlurEnabled && (
        <>
          <div className="mt-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="block">Peripheral Gaussian Blur Kernel</label>
              </TooltipTrigger>
              <TooltipContent>Select a kernel size for Gaussian blur.</TooltipContent>
            </Tooltip>
            <select
              value={kernelValue}
              onChange={(e) => setParameter('kernelValue', e.target.value)}
              className="w-full mt-1 p-2 border border-gray-800 rounded text-gray-800"
            >
              {[3, 5, 7, 9, 11, 21].map((size) => (
                <option key={size} value={`(${size}, ${size})`}>{`(${size}, ${size})`}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="block">Peripheral Gaussian Sigma: {peripheralSigma}</label>
              </TooltipTrigger>
              <TooltipContent>Enter the sigma value for Gaussian blur.</TooltipContent>
            </Tooltip>
            <input
              type="number"
              value={peripheralSigma}
              onChange={(e) => setParameter('peripheralSigma', parseFloat(e.target.value))}
              disabled={!isPeripheralBlurEnabled}
              className={`w-full mt-1 p-2 border ${isPeripheralBlurEnabled ? 'border-gray-800' : 'border-gray-400'} rounded text-gray-${isPeripheralBlurEnabled ? '800' : '400'}`}
            />
          </div>
        </>
      )}

      <div className="mt-4 flex items-center">
        <input
          type="checkbox"
          checked={isPeripheralGrayscale}
          onChange={(e) => setParameter('isPeripheralGrayscale', e.target.checked)}
          className="mr-2"
        />
        <label>Peripheral Grayscale</label>
      </div>


    </aside>
  );
};

export default Sidebar;
