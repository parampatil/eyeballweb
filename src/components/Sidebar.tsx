import DownloadZip from "./DownloadZip";
import { useModelParametersStore } from "@/store/modelParametersStore";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

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
    foveationType,
    retinalWarp,
    setParameter,
    resetParameters,
  } = useModelParametersStore();

  return (
    <aside className="h-full w-full md:w-80 border rounded border-gray-400 p-4 flex flex-col gap-4">
      <h2 className="text-lg font-bold">Model Parameters</h2>

      <button
        onClick={resetParameters}
        className="text-sm font-medium text-appaccent transition-all duration-300 hover:scale-105 hover:border hover:border-appaccent hover:bg-appaccent/10 p-2 rounded border border-transparent"
      >
        Reset Parameters
      </button>

      <div className="mt-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Input Image Resolution (px)</label>
          </TooltipTrigger>
          <TooltipContent>
            Enter the resolution for input images in pixels.
          </TooltipContent>
        </Tooltip>
        <Input
          type="number"
          min={1}
          value={inputImageResolution}
          onChange={(e) =>
            setParameter(
              "inputImageResolution",
              Math.max(1, parseInt(e.target.value) || 1)
            )
          }
          className="w-full mt-2 p-2 border !border-appaccent rounded"
        />
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Fovea Location (x, y)</label>
          </TooltipTrigger>
          <TooltipContent>
            Specify the x and y coordinates for the fovea location.
          </TooltipContent>
        </Tooltip>
        <div className="flex gap-2">
          <Input
            type="number"
            min={0}
            value={foveaX}
            onChange={(e) =>
              setParameter(
                "foveaX",
                Math.min(inputImageResolution, parseInt(e.target.value) || 0)
              )
            }
            className="w-full mt-2 p-2 border !border-appaccent rounded "
            placeholder="x"
          />
          <Input
            type="number"
            min={0}
            value={foveaY}
            onChange={(e) =>
              setParameter(
                "foveaY",
                Math.min(inputImageResolution, parseInt(e.target.value) || 0)
              )
            }
            className="w-full mt-2 p-2 border !border-appaccent rounded "
            placeholder="y"
          />
        </div>
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Fovea Radius: {foveaRadius}</label>
          </TooltipTrigger>
          <TooltipContent>Adjust the radius of the fovea area.</TooltipContent>
        </Tooltip>
        <Slider
          min={0}
          max={inputImageResolution}
          value={[foveaRadius]}
          onValueChange={(value: number[]) =>
            setParameter("foveaRadius", value[0])
          }
          className="w-full mt-2"
        />
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">
              Peripheral Active Cone Cells (%): {peripheralConeCells}
            </label>
          </TooltipTrigger>
          <TooltipContent>
            Set the percentage of active cone cells in the periphery.
          </TooltipContent>
        </Tooltip>
        <Slider
          min={0}
          max={100}
          value={[peripheralConeCells]}
          onValueChange={(value: number[]) =>
            setParameter("peripheralConeCells", value[0])
          }
          className="w-full mt-2"
        />
      </div>

      <div>
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">
              Fovea Active Rod Cells (%): {foveaRodCells}
            </label>
          </TooltipTrigger>
          <TooltipContent>
            Set the percentage of active rod cells in the fovea.
          </TooltipContent>
        </Tooltip>
        <Slider
          min={0}
          max={100}
          value={[foveaRodCells]}
          onValueChange={(value: number[]) =>
            setParameter("foveaRodCells", value[0])
          }
          className="w-full mt-2"
        />
      </div>

      <div className="flex items-center space-x-2 my-2">
        <Checkbox
          defaultChecked={isPeripheralBlurEnabled}
          checked={isPeripheralBlurEnabled}
          onCheckedChange={(checked) =>
            setParameter("isPeripheralBlurEnabled", checked)
          }
        />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Peripheral Gaussian Blur
        </label>
      </div>

      {isPeripheralBlurEnabled && (
        <>
          <div className="ps-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="block">Peripheral Gaussian Blur Kernel</label>
              </TooltipTrigger>
              <TooltipContent>
                Select a kernel size for Gaussian blur.
              </TooltipContent>
            </Tooltip>
            <Select
              value={kernelValue}
              onValueChange={(value) => setParameter("kernelValue", value)}
            >
              <SelectTrigger className="w-full mt-2 p-2 border !border-appaccent rounded">
                <SelectValue placeholder="Select Kernel Size" />
              </SelectTrigger>
              <SelectContent>
                {[3, 5, 7, 9, 11, 21].map((size) => (
                  <SelectItem
                    key={size}
                    value={`(${size}, ${size})`}
                  >{`(${size}, ${size})`}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="ps-6">
            <Tooltip>
              <TooltipTrigger asChild>
                <label className="block">
                  Peripheral Gaussian Sigma: {peripheralSigma}
                </label>
              </TooltipTrigger>
              <TooltipContent>
                Enter the sigma value for Gaussian blur.
              </TooltipContent>
            </Tooltip>
            <Input
              type="number"
              min={0}
              value={peripheralSigma}
              onChange={(e) =>
                setParameter("peripheralSigma", parseFloat(e.target.value))
              }
              disabled={!isPeripheralBlurEnabled}
              className={`w-full mt-2 p-2 border !border-appaccent rounded`}
            />
          </div>
        </>
      )}

      <div className="my-2 flex items-center space-x-2">
        <Checkbox
          defaultChecked={isPeripheralGrayscale}
          checked={isPeripheralGrayscale}
          onCheckedChange={(checked) =>
            setParameter("isPeripheralGrayscale", checked)
          }
        />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Peripheral Grayscale
        </label>
      </div>

      <div className="my-2 flex items-center space-x-2">
        <Checkbox
          defaultChecked={retinalWarp}
          checked={retinalWarp}
          onCheckedChange={(checked) =>
            setParameter("retinalWarp", checked)
          }
        />
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          Retinal Warp
        </label>
      </div>

      <div className="my-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <label className="block">Foveation Type</label>
          </TooltipTrigger>
          <TooltipContent>
            Select the type of foveation: static or dynamic.
          </TooltipContent>
        </Tooltip>
        <RadioGroup
          defaultValue={foveationType}
          onValueChange={(value) => setParameter("foveationType", value)}
          className="flex justify-start gap-10 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="static" id="static" />
            <Label htmlFor="static">Static</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dynamic" id="dynamic" />
            <Label htmlFor="dynamic">Dynamic</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="w-full border-t-8 border-gray-400 border-dotted pt-4 flex justify-center">
      <DownloadZip />
      </div>
    </aside>
  );
};

export default Sidebar;
