import { getAllTokens } from "@/app/api/getAllTokens";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface SearchBarProps {
  currentTheme: string;
}

interface TokenInfo {
  id: string;
  symbol: string;
  name: string;
}

const SearchBar = ({ currentTheme }: SearchBarProps) => {
  const [isActive, setIsActive] = useState(false);
  const [search, setSearch] = useState("");
  const [allTokens, setAllTokens] = useState<TokenInfo[]>([]);
  const filterTokens = allTokens?.filter((t) => {
    const lowerCaseName = t.name.toLowerCase();
    return lowerCaseName.startsWith(search);
  });

  const searchBar = useRef<HTMLInputElement | null>(null);

  const handleClickOutside = (e: MouseEvent) => {
    setIsActive(searchBar.current === e.target);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTokens();
      setAllTokens(data);
    };
    fetchData();

    window.addEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <div className="flex items-center relative">
        <Image
          src={`/images/navbar/${currentTheme}/search.svg`}
          alt="Search icon"
          width={20}
          height={20}
          className="absolute left-3"
        />
        <input
          type="text"
          ref={searchBar}
          placeholder="Search..."
          className="px-11 py-3 bg-bkg-input/40 md:w-[396px] rounded-md placeholder-content-sub outline-none"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div
        className={`bg-bkg-input/40 h-[200px] max-w-[300px] overflow-y-scroll rounded-lg absolute ml-8 ${
          search && isActive ? "" : "hidden"
        }`}
      >
        {filterTokens?.map((t) => (
          <Link
            key={t.id}
            href={`/token-info/${t.id}`}
            className="py-2 px-3 block hover:bg-bkg-input duration-100"
          >
            {t.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
