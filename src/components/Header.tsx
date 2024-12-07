import LetterPullup from "@/components/ui/letter-pullup";

const Header = () => {
    return (
      <header className="px-4 border-b border-disabled">
        <div className="flex items-end justify-start gap-2">
        <LetterPullup words="Eyeball Web" delay={0.05} className="!text-lg tracking-wide "/><span className="animate-fade duration-700 text-red-600 text-xs">v.0.1.0</span>
        </div>
      </header>
    );
  };
  
  export default Header;
  