"use client";

import { getPastData } from "@/app/api/getBitcoinInfo";
import formatNum from "@/app/utils/formatNum";
import { useState, useRef, useEffect } from "react";
import PricesChart from "./PricesChart";
import VolumeChart from "./VolumeChart";
import TimePeriodSelector from "./TimePeriodSelector";
import TokenCarousel from "./TokenCarousel";

const DuoCharts = () => {
  const currentToken = useRef("Bitcoin");
  const [prices, setPrices] = useState<Array<[number, number]>>([]);
  const [lastPrice, setLastPrice] = useState<string>("N/A");
  const [volumes, setVolumes] = useState<number[]>([]);
  const [totalVolume, setTotalVolume] = useState<string>("N/A");
  const timePeriod = useRef("1D");

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
    if (timePeriod.current === "1D") {
      return data.filter((data, idx) => {
        return idx % 12 === 0;
      });
    } else if (timePeriod.current === "1Y" || timePeriod.current === "5Y") {
      return data.filter((data, idx) => {
        return idx % 30 === 0;
      });
    } else {
      return data;
    }
  };

  const getQueryString = () => {
    config.days = daysMap[timePeriod.current];
    let query = Object.entries(config).reduce(
      (acc, [key, val]) => `${acc}&${key}=${val}`,
      ""
    );

    query += timePeriod.current === "1D" ? "" : "&interval=daily";
    return query;
  };

  const changeToken = (token: string) => {
    currentToken.current = token;
    fetchData();
  };

  const handleClick = (period: string) => {
    timePeriod.current = period;
    fetchData();
  };

  const fetchData = async () => {
    const queryString = getQueryString();
    const data = await getPastData(
      currentToken.current.toLowerCase(),
      queryString
    );
    const prices = getDataFrequency(data.prices);
    const volumes = getDataFrequency(data.total_volumes);
    setPrices(prices);
    setLastPrice(formatNum(data.prices[data.prices.length - 1][1]));
    setVolumes(volumes.map((arr) => arr[1]));
    setTotalVolume(
      formatNum(
        timePeriod.current === "1D"
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

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex justify-center mt-[72px]">
      <div className="flex flex-col items-center max-w-[1296px]">
        <TokenCarousel changeToken={changeToken} />
        <div className="flex gap-8">
          <PricesChart
            token={currentToken.current}
            currPrice={lastPrice}
            prices={prices}
          />
          <VolumeChart
            totalVolume={totalVolume}
            volumes={volumes}
            timePeriod={timePeriod.current}
          />
        </div>
        <TimePeriodSelector
          currTimePeriod={timePeriod.current}
          handleClick={handleClick}
        />
      </div>
    </div>
  );
};

export default DuoCharts;
