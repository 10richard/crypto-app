"use client";

import Image from "next/image";
import { useCurrency } from "@/app/contexts/currencyContext";
import { useState } from "react";

interface Token {
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
}

interface TokenContainerProps {
  title: string;
  token: Token | null;
  currentTheme: string;
  bgColor: string;
  handleClick: (val: Token) => void;
  allTokens: Token[];
}

const TokenContainer = ({
  title,
  token,
  currentTheme,
  bgColor,
  handleClick,
  allTokens,
}: TokenContainerProps) => {
  const { currentCurrency } = useCurrency();
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("1");

  const [search, setSearch] = useState("");
  const filterTokens = allTokens?.filter((t) => {
    const lowerCaseName = t.name.toLowerCase();
    return lowerCaseName.startsWith(search.toLowerCase());
  });

  const changeToken = (token: Token) => {
    setToggle(false);
    handleClick(token);
    setSearch("");
  };

  return (
    <div className={`flex flex-col gap-10 p-6 w-1/2 rounded-2xl ${bgColor}`}>
      <h3 className="text-sm text-content-main/80">{title}</h3>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setToggle(true)}
            >
              <img
                src={token?.image}
                alt={`${token?.name} Image`}
                className="w-[30px]"
              />
              <p className="text-xl font-medium">{token?.name}</p>
              <Image
                src={`/images/navbar/${currentTheme}/chevron-down.svg`}
                alt="Chevron down"
                width={20}
                height={20}
              ></Image>
            </button>
            <div
              className={`flex flex-col bg-bkg-input rounded-lg ${
                toggle ? "" : "hidden"
              } absolute h-[200px] overflow-y-scroll top-0 min-w-[300px]`}
            >
              <div className="flex justify-between p-3">
                <input
                  type="text"
                  value={search}
                  placeholder="Type a currency"
                  onChange={(e) => setSearch(e.target.value)}
                  className="text-black px-3 py-1 rounded-lg"
                />
                <button onClick={() => setToggle(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              {filterTokens.map((t) => (
                <button
                  key={t.id}
                  className={`flex items-center gap-2 px-3 py-2 min-w-max hover:bg-black/60 duration-200 ${
                    t.name === token?.name ? "hidden" : ""
                  }`}
                  onClick={() => changeToken(t)}
                >
                  <img
                    src={t.image}
                    alt={`${t.name} Image`}
                    className="w-[30px]"
                  />
                  <p className="text-lg font-medium">{t.name}</p>
                </button>
              ))}
            </div>
          </div>
          <input
            type="number"
            className="text-2xl font-bold bg-transparent text-right outline-none"
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
        </div>
        <div className="p-2 border-t-[1px]">
          <p>
            <span className="text-content-main/80">
              1 {token?.symbol.toUpperCase()} =
            </span>{" "}
            {currentCurrency.symbol}
            {token?.current_price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenContainer;
