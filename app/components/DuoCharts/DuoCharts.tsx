"use client";

import { getPastData } from "@/app/api/getPastData";
import formatNum from "@/app/utils/formatNum";
import getDataFrequency from "@/app/utils/getDataFrequency";
import { useState, useEffect } from "react";
import PricesChart from "./PricesChart";
import TimePeriodSelector from "./TimePeriodSelector";
import TokenCarousel from "./TokenCarousel";
import { getTop50Tokens } from "@/app/api/getTopTokens";
import VolumeChart from "./VolumeChart";

interface TokenInfo {
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
}

interface TokenSlide {
  id: string;
  title: string;
  image: string;
  current_price: number;
  price_change1h: number;
  selected: boolean;
  chartData?: {
    volume_summation?: string;
    prices: Array<[number, number]>;
    total_volumes: number[];
  };
}

const DuoCharts = () => {
  const [tokenSlides, setTokenSlides] = useState<TokenSlide[]>([]);
  const [timePeriod, setTimePeriod] = useState("1D");

  const daysMap: Record<string, string> = {
    "1D": "1",
    "7D": "7",
    "14D": "14",
    "1M": "30",
    "1Y": "365",
    "5Y": "1825",
  };

  const config = {
    vs_currency: "usd",
    days: "1D",
  };

  const getQueryString = () => {
    config.days = daysMap[timePeriod];
    let query = Object.entries(config).reduce(
      (acc, [key, val]) => `${acc}&${key}=${val}`,
      ""
    );

    query += timePeriod === "1D" ? "" : "&interval=daily";
    return query;
  };

  useEffect(() => {
    const fetchTokenList = async () => {
      const tokenList = await getTop50Tokens();
      const tokenSlides = tokenList.map((token: TokenInfo, idx: number) => ({
        id: token.id,
        title: `${token.name} (${token.symbol.toUpperCase()})`,
        image: token.image,
        current_price: token.current_price,
        price_change1h: token.price_change_percentage_1h_in_currency,
        selected: idx === 0,
      }));

      setTokenSlides(tokenSlides);
    };

    fetchTokenList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const activeTokens = tokenSlides.filter((t) => t.selected);
      const queryString = getQueryString();

      if (activeTokens.length > 0) {
        const updatedTokenSlides = await Promise.all(
          activeTokens.map(async (token) => {
            const data = await getPastData(token.id, queryString);
            const prices = getDataFrequency(data.prices, timePeriod);
            const volumes = getDataFrequency(data.total_volumes, timePeriod);
            const volume_summation = formatNum(
              timePeriod === "1D"
                ? volumes.reduce(
                    (sum: number, curr: Array<number>) => sum + curr[1],
                    0
                  ) / 24
                : data.total_volumes.reduce(
                    (sum: number, curr: Array<number>) => sum + curr[1],
                    0
                  )
            );

            return {
              ...token,
              chartData: {
                volume_summation: volume_summation,
                prices: prices,
                total_volumes: volumes.map((arr) => arr[1]),
              },
            };
          })
        );

        setTokenSlides((tokenSlides: TokenSlide[]) =>
          tokenSlides.map((t) =>
            activeTokens.includes(t)
              ? updatedTokenSlides.find((ut) => ut.id === t.id) || t
              : t
          )
        );
      }
    };

    fetchData();
  }, [tokenSlides, timePeriod]);

  return (
    <div className="flex justify-center mt-[72px]">
      <div className="flex flex-col items-center max-w-[1296px]">
        <TokenCarousel
          tokenSlides={tokenSlides}
          handleSelection={setTokenSlides}
        />
        <div className="flex gap-8">
          <PricesChart tokens={tokenSlides} />
          <VolumeChart tokens={tokenSlides} timePeriod={timePeriod} />
        </div>
        <TimePeriodSelector
          currTimePeriod={timePeriod}
          handleClick={setTimePeriod}
        />
      </div>
    </div>
  );
};

export default DuoCharts;
