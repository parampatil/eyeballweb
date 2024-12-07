import LetterPullup from "@/components/ui/letter-pullup";
import { FadeText } from "@/components/ui/fade-text";
import { RainbowButton } from "@/components/ui/rainbow-button";

const Header = () => {
  return (
    <header className="flex justify-between items-center mb-2 px-4 border-b border-appaccent shadow-lg shadow-appaccent">
      <div className="flex items-end justify-start gap-2">
        <LetterPullup
          words="Eyeball Web"
          delay={0.05}
          className="!text-lg tracking-wide "
        />
        <FadeText
          direction="left"
          framerProps={{
            show: { transition: { duration: 0.5, delay: 0.8 } },
          }}
          text="v.0.1.0"
          className="text-red-600 text-xs"
        />
      </div>
      <div className="p-2">
        <RainbowButton
          className="hover:opacity-50 transition-opacity h-auto"
          onClick={() =>
            (window.location.href =
              "https://github.com/parampatil/eyeball-software/releases/download/v0.1.0/eyeball_project.exe")
          }
        >
          Download Software
        </RainbowButton>
      </div>
    </header>
  );
};

export default Header;
