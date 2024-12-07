import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Tabs from "../components/Tabs";
import InputImageGrid from "../components/InputImageGrid";
import ProcessedImageGrid from "../components/ProcessedImageGrid";
import Sidebar from "../components/Sidebar";
import LoadDataset from "../components/LoadDataset";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Input Images");

  return (
    <MainLayout>
      <section className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col md:flex-row gap-2 items-center justify-between p-2">
          <div className="h-full flex-1 flex w-full flex-col border border-gray-400 rounded">
            <LoadDataset activeTab={activeTab} setActiveTab={setActiveTab} />
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="flex-1 flex p-4">
              {activeTab === "Input Images" ? (
                <InputImageGrid />
              ) : (
                <ProcessedImageGrid />
              )}
            </div>
          </div>
          <Sidebar />
        </div>
      </section>
    </MainLayout>
  );
};

export default Home;
