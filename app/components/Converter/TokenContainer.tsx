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
  image: string;
  name: string;
  symbol: string;
  price: number;
  currentTheme: string;
  bgColor: string;
  handleClick: (val: Token) => void;
  allTokens: Token[];
}

const TokenContainer = ({
  title,
  image,
  name,
  symbol,
  price,
  currentTheme,
  bgColor,
  handleClick,
  allTokens,
}: TokenContainerProps) => {
  const { currentCurrency } = useCurrency();
  const [toggle, setToggle] = useState(false);
  const [value, setValue] = useState("1");

  return (
    <div className={`flex flex-col gap-10 p-6 w-1/2 rounded-2xl ${bgColor}`}>
      <h3 className="text-sm text-content-main/80">{title}</h3>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="relative">
            <button
              className="flex items-center gap-2"
              onClick={() => setToggle(!toggle)}
            >
              <img src={image} alt={`${name} Image`} className="w-[30px]" />
              <p className="text-xl font-medium">{name}</p>
              <Image
                src={`/images/navbar/${currentTheme}/chevron-down.svg`}
                alt="Chevron down"
                width={20}
                height={20}
              ></Image>
            </button>
            <div
              className={`flex flex-col bg-bkg-input rounded-lg mt-2 ${
                toggle ? "" : "hidden"
              } absolute h-[200px] overflow-y-scroll`}
            >
              {allTokens.map((t) => (
                <button
                  className={`flex items-center gap-2 px-3 py-2 min-w-max ${
                    t.name === name ? "hidden" : ""
                  }`}
                  onClick={() => handleClick(t)}
                >
                  <img
                    src={t.image}
                    alt={`${t.name} Image`}
                    className="w-[30px]"
                  />
                  <p className="text-xl font-medium">{t.name}</p>
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
              1 {symbol.toUpperCase()} =
            </span>{" "}
            {currentCurrency.symbol}
            {price.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenContainer;
