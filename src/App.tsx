import Home from "./pages/Home";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster"

function App() {
  return (
    <TooltipProvider>
      <Home />
      <Toaster />
    </TooltipProvider>
  );
}

export default App;
