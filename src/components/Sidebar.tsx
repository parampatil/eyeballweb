
const Sidebar = () => {
  return (
    <aside className="bg-disabled w-80 p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">Model Parameters</h2>
      {/* Add more sliders and checkboxes as needed */}
      <div className="mt-auto">
        <button className="bg-secondary w-full py-2 text-center rounded-md">Load Config</button>
        <button className="bg-secondary w-full py-2 mt-2 text-center rounded-md">Save Config</button>
      </div>
    </aside>
  );
};

export default Sidebar;
