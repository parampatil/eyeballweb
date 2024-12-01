import Home from "./pages/Home";
import { TooltipProvider } from "@/components/ui/tooltip";

function App() {
  return (
    <TooltipProvider>
      <Home />
    </TooltipProvider>
  );
}

export default App;
