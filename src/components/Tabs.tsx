const Tabs = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (tab: string) => void }) => {
    return (
      <div className="flex border-b border-disabled">
        {['Input Images', 'Processed Images'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 transition-colors ${
              activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-text-secondary '
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    );
  };
  
  export default Tabs;
  