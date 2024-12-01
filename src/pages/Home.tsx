import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import Tabs from "../components/Tabs";
import InputImageGrid from "../components/InputImageGrid";
import ProcessedImageGrid from "../components/ProcessedImageGrid";
import Sidebar from "../components/Sidebar";
import LoadDataset from "../components/LoadDataset";
import Bottombar from "../components/Bottombar";

const Home = () => {
  const [activeTab, setActiveTab] = useState("Input Images");

  return (
    <MainLayout>
      <section className="flex-1 flex flex-col">
        <LoadDataset activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 m-2 flex flex-col border border-gray-400 rounded">
          <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="flex-1 flex p-4 border border-disabled rounded">
            {activeTab === "Input Images" ? (
              <InputImageGrid />
            ) : (
              <ProcessedImageGrid />
            )}
          </div>
        </div>
        <Bottombar />
      </section>
      <Sidebar />
    </MainLayout>
  );
};

export default Home;
