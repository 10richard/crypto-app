import Image from "next/image";

interface ThemeSwitcherProps {
  currentTheme: string;
  toggleTheme: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const ThemeSwitcher = ({ currentTheme, toggleTheme }: ThemeSwitcherProps) => {
  return (
    <button
      type="button"
      className="flex items-center justify-center w-12 h-12 bg-bkg-input/40 rounded-md"
      onClick={toggleTheme}
    >
      <Image
        src={`/images/navbar/${currentTheme}/color-theme.svg`}
        alt="Color theme change icon"
        width={24}
        height={24}
      />
    </button>
  );
};

export default ThemeSwitcher;
