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
    for (let i = 0; i < search.length; i++) {
      if (t.name[i] !== search[i]) return false;
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

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getAllTokens();
  //     const filteredTokens = search
  //       ? null
  //       : data.filter((t: TokenInfo) => t.name.includes(search));
  //     setDisplayTokens(filteredTokens);
  //   };

  //   fetchData();
  // }, [search]);

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
          className="px-11 py-3 bg-bkg-input/40 md:w-[396px] rounded-md placeholder-content-sub"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div
        className={`bg-bkg-input/40 h-max-[200px] max-w-max overflow-hidden rounded-lg absolute ml-8 ${
          search ? "" : "hidden"
        }`}
      >
        {filterTokens?.map((t) => (
          <div>
            <Link
              key={t.id}
              href={`/token-info/${t.id}`}
              className="text-red-500 py-2 px-3"
            >
              {t.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
