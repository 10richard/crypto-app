import React from "react";
import Image from "next/image";

interface SearchBarProps {
  currentTheme: string;
  handleSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchBar = ({ currentTheme, handleSearch }: SearchBarProps) => {
  return (
    <div className="flex items-center relative">
      <Image
        src={`/images/navbar/${currentTheme}/search.svg`}
        alt="Search icon"
        width={20}
        height={0}
        className="absolute left-3"
      />
      <input
        type="text"
        placeholder="Search..."
        className="px-11 py-3 bg-bkg-input/40 md:w-[396px] rounded-md placeholder-content-sub"
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
