"use client";

import getTodayDateTime from "@/app/utils/getTodayDateTime";
import TimePeriodSelector from "../DuoCharts/TimePeriodSelector";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import TokenContainer from "./TokenContainer";
import Image from "next/image";
import { useTheme } from "@/app/contexts/themeContext";
import { useEffect, useState } from "react";
import { useCurrency } from "@/app/contexts/currencyContext";
import ComparisonChart from "./ComparisonChart";
import { getTopTokens } from "@/app/api/getTopTokens";

// User can only select from the top 50 tokens?
//

// interface Token {
//   id: string;
//   // name: string;
//   // img: string;
//   // price: number;
//   prices?: Array<[number, number]>;
// }

interface Token {
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
}

// Get all Top Tokens and allow user to choose from dropdown (similar functionality as searchbar)

const Converter = () => {
  const [buyToken, setBuyToken] = useState<Token>();
  const [sellToken, setSellToken] = useState<Token>();
  const [topTokens, setTopTokens] = useState([]);
  const [timePeriod, setTimePeriod] = useState("1D");
  const { currentTheme } = useTheme();
  const { currentCurrency } = useCurrency();

  useEffect(() => {
    const fetchTopTokens = async () => {
      const fetchTokens = await getTopTokens(currentCurrency.abbr);
      const formatTokens = fetchTokens.map((token: Token) => ({
        id: token.id,
        name: `${token.name} (${token.symbol.toUpperCase()})`,
        current_price: token.current_price,
        symbol: token.symbol,
        image: token.image,
      }));

      setTopTokens(formatTokens);
      setSellToken(formatTokens[0]);
      setBuyToken(formatTokens[1]);
    };

    fetchTopTokens();
  }, [currentCurrency]);

  const switchCoins = () => {
    const buyTokenCopy = buyToken;
    setBuyToken(sellToken);
    setSellToken(buyTokenCopy);
  };

  return (
    <MaxWidthContainer className="pt-11 pb-[70px]">
      <div className="mb-6">
        <h2 className="text-xl">Online currency convertor</h2>
        <p className="text-[#9E9E9E]">{getTodayDateTime()}</p>
      </div>
      <div>
        <div className="flex gap-6 w-full relative">
          <TokenContainer
            title="You sell"
            token={sellToken || null}
            currentTheme={currentTheme}
            bgColor="bg-chart-price"
            handleClick={setSellToken}
            allTokens={topTokens}
          />
          <TokenContainer
            title="You buy"
            token={buyToken || null}
            currentTheme={currentTheme}
            bgColor="bg-chart-volume"
            handleClick={setBuyToken}
            allTokens={topTokens}
          />
          <button
            className="bg-content-main p-3 w-[48px] h-[48px] absolute right-0 left-0 mx-auto top-1/2 -translate-y-1/2 rounded-full"
            onClick={switchCoins}
          >
            {/* Does the converter btn serve a purpose? Or is just there for decoration? */}
            <Image
              src={`/images/converter/${currentTheme}/converter-icon.svg`}
              alt="Converter icon"
              width={24}
              height={24}
            ></Image>
          </button>
        </div>
        <div className="flex flex-col">
          <ComparisonChart />
          <TimePeriodSelector
            currTimePeriod={timePeriod}
            handleClick={setTimePeriod}
          />
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default Converter;
