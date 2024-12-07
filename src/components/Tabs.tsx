import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { FaImages } from "react-icons/fa6";
import { useInputImageStore } from "@/store/inputImageStore";
import { useProcessedImageStore } from "@/store/processedImageStore";

const Tabs = ({
  activeTab,
  setActiveTab,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) => {
  const { inputImages } = useInputImageStore();
  const { processedImages } = useProcessedImageStore();
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const setTabPosition = useCallback(() => {
    const currentTab = tabsRef.current.find(
      (tab) => tab?.textContent === activeTab
    );
    setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
    setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
  }, [activeTab]);

  useEffect(() => {
    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [setTabPosition]);

  const tabs = useMemo(() => ["Input Images", "Processed Images"], []);

  return (
    <div className="flex justify-between shadow">
      <div className="relative">
        <div className="flex border-b border-disabled">
          {tabs.map((tab, idx) => (
            <button
              key={tab}
              ref={(el) => (tabsRef.current[idx] = el)}
              className={`px-4 py-2 transition-colors ${
                activeTab === tab ? "text-appaccent" : "text-text-secondary"
              } ${
                tab === "Processed Images" && processedImages.length === 0
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              onClick={() =>
                tab !== "Processed Images" || processedImages.length > 0
                  ? setActiveTab(tab)
                  : null
              }
              disabled={
                tab === "Processed Images" && processedImages.length === 0
              }
            >
              {tab}
            </button>
          ))}
        </div>
        <span
          className="absolute bottom-0 block h-1 bg-appaccent transition-all duration-300"
          style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
        />
      </div>
      <div className="flex items-center space-x-4 me-4">
        <span className="flex items-center gap-2 animate-fade duration-500">
          <FaImages />{" "}
          {activeTab === "Input Images"
            ? inputImages.length
            : processedImages.length}
        </span>
      </div>
    </div>
  );
};

export default Tabs;
