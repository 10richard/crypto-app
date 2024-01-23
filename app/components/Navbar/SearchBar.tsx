import { getAllTokens } from "@/app/api/getAllTokens";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

interface SearchBarProps {
  currentTheme: string;
}

interface TokenInfo {
  id: string;
  symbol: string;
  name: string;
}

const SearchBar = ({ currentTheme }: SearchBarProps) => {
  const [search, setSearch] = useState("");
  const [allTokens, setAllTokens] = useState<TokenInfo[]>([]);
  const filterTokens = allTokens?.filter((t) => {
    const lowerCaseName = t.name.toLowerCase();
    for (let i = 0; i < search.length; i++) {
      if (lowerCaseName[i] !== search[i]) return false;
    }
    return true;
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTokens();
      setAllTokens(data);
    };

    fetchData();
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
          placeholder="Search..."
          className="px-11 py-3 bg-bkg-input/40 md:w-[396px] rounded-md placeholder-content-sub outline-none"
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
        />
      </div>
      <div
        className={`bg-bkg-input/40 h-[200px] max-w-max overflow-y-scroll rounded-lg absolute ml-8 ${
          search ? "" : "hidden"
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
