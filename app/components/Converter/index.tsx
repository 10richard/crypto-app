"use client";

import getTodayDateTime from "@/app/utils/getTodayDateTime";
import TimePeriodSelector from "../DuoCharts/TimePeriodSelector";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import TokenContainer from "./TokenContainer";
import Image from "next/image";
import { useTheme } from "@/app/contexts/themeContext";
import { useEffect, useState } from "react";
import { getPastData } from "@/app/api/getPastData";
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

  // const daysMap: Record<string, string> = {
  //   "1D": "1",
  //   "7D": "7",
  //   "14D": "14",
  //   "1M": "30",
  //   "1Y": "365",
  //   "5Y": "1825",
  // };

  // const config = {
  //   vs_currency: currentCurrency.abbr,
  //   days: "1D",
  // };

  useEffect(() => {
    const fetchTopTokens = async () => {
      const fetchTokens = await getTopTokens(currentCurrency.abbr);
      const formatTokens = fetchTokens.map((token: Token) => ({
        id: token.id,
        name: `${token.name} (${token.symbol.toUpperCase()})`,
        price: token.current_price,
        image: token.image,
      }));

      setTopTokens(formatTokens);
      setSellToken(formatTokens[0]);
      setBuyToken(formatTokens[1]);
    };

    fetchTopTokens();
  }, []);

  // const getQueryString = () => {
  //   config.days = daysMap[timePeriod];
  //   config.vs_currency = currentCurrency.abbr;
  //   let query = Object.entries(config).reduce(
  //     (acc, [key, val]) => `${acc}&${key}=${val}`,
  //     ""
  //   );

  //   query += timePeriod === "1D" ? "" : "&interval=daily";
  //   return query;
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const leftToken = await getPastData(buyToken.id, getQueryString());
  //     const rightToken = await getPastData(sellToken.id, getQueryString());

  //     setBuyToken({ id: "bitcoin", prices: leftToken.prices });
  //   };

  //   fetchData();
  // }, []);

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
            tokenImg={sellToken ? sellToken?.image : ""}
            token={sellToken ? sellToken?.name : ""}
            price={sellToken ? sellToken.current_price : 0}
            currentTheme={currentTheme}
            bgColor="bg-chart-price"
          />
          <TokenContainer
            title="You buy"
            tokenImg={buyToken ? buyToken.image : ""}
            token={buyToken ? buyToken.name : ""}
            price={buyToken ? buyToken.current_price : 0}
            currentTheme={currentTheme}
            bgColor="bg-chart-volume"
          />
          <button className="bg-content-main p-3 w-[48px] h-[48px] absolute right-0 left-0 mx-auto top-1/2 -translate-y-1/2 rounded-full">
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
