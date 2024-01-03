"use client";

import { getPastData } from "@/app/api/getBitcoinInfo";
import formatNum from "@/app/utils/formatNum";
import { useState, useRef, useEffect } from "react";
import PricesChart from "./PricesChart";
import VolumeChart from "./VolumeChart";
import TimePeriodSelector from "./TimePeriodSelector";
import TokenCarousel from "./TokenCarousel";

const DuoCharts = () => {
  const [selectedToken, setSelectedToken] = useState("Bitcoin (BTC)");
  const tokenID = useRef("bitcoin");
  const [prices, setPrices] = useState<Array<[number, number]>>([]);
  const [lastPrice, setLastPrice] = useState<string>("N/A");
  const [volumes, setVolumes] = useState<number[]>([]);
  const [totalVolume, setTotalVolume] = useState<string>("N/A");
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

  const getDataFrequency = (data: Array<[number, number]>) => {
    if (timePeriod === "1D") {
      return data.filter((data, idx) => {
        return idx % 12 === 0;
      });
    } else if (timePeriod === "1Y" || timePeriod === "5Y") {
      return data.filter((data, idx) => {
        return idx % 30 === 0;
      });
    } else {
      return data;
    }
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

  const changeToken = (id: string, name: string, symbol: string) => {
    setSelectedToken(`${name} (${symbol.toUpperCase()})`);
    tokenID.current = id;
  };

  useEffect(() => {
    const fetchData = async () => {
      const queryString = getQueryString();
      const data = await getPastData(tokenID.current, queryString);
      const prices = getDataFrequency(data.prices);
      const volumes = getDataFrequency(data.total_volumes);
      setPrices(prices);
      setLastPrice(formatNum(data.prices[data.prices.length - 1][1]));
      setVolumes(volumes.map((arr) => arr[1]));
      setTotalVolume(
        formatNum(
          timePeriod === "1D"
            ? volumes.reduce(
                (sum: number, curr: Array<number>) => sum + curr[1],
                0
              ) / 24
            : data.total_volumes.reduce(
                (sum: number, curr: Array<number>) => sum + curr[1],
                0
              )
        )
      );
    };
    fetchData();
  }, [selectedToken, timePeriod]);

  return (
    <div className="flex justify-center mt-[72px]">
      <div className="flex flex-col items-center max-w-[1296px]">
        <TokenCarousel changeToken={changeToken} />
        <div className="flex gap-8">
          <PricesChart
            token={selectedToken}
            currPrice={lastPrice}
            prices={prices}
          />
          <VolumeChart
            totalVolume={totalVolume}
            volumes={volumes}
            timePeriod={timePeriod}
          />
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
