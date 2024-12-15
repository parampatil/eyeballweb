import LetterPullup from "@/components/ui/letter-pullup";
import { FadeText } from "@/components/ui/fade-text";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { FaDownload, FaGithub, FaXmark } from "react-icons/fa6";
import { TbFileTypeZip } from "react-icons/tb";
import { useState } from "react";

const Header = () => {
  const [showOptions, setShowOptions] = useState(false);

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
      <div className="p-2 flex gap-2">
          <div className="flex gap-2">
            <RainbowButton
              className={`hover:opacity-50 transition-all duration-300 ${showOptions ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
              onClick={() =>
                (window.location.href =
                  "https://github.com/parampatil/eyeball-software/releases/download/v0.1.0/eyeball_project.exe")
              }
            >
              <TbFileTypeZip className="m-auto  mr-1" />
              Download Software
            </RainbowButton>
            <RainbowButton
              className={`hover:opacity-50 transition-all duration-300 ${showOptions ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
              onClick={() =>
                (window.location.href =
                  "https://github.com/parampatil/eyeball-software")
              }
            >
              <FaGithub className="m-auto mr-1" />
              View Source Code
            </RainbowButton>
          </div>
        <RainbowButton
          onClick={() => setShowOptions(!showOptions)}
          className="hover:opacity-50 transition-opacity h-auto"
        >
          {showOptions ? <FaXmark className="m-auto" /> : <FaDownload className="m-auto" />}
        </RainbowButton>
      </div>
    </header>
  );
};

export default Header;
