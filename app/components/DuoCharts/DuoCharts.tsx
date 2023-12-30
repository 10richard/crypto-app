"use client";

import {
  getPast24Hours,
  getPast7Days,
  getPast14Days,
  getPastMonth,
  getPastYear,
  getPast5Years,
} from "@/app/api/getBitcoinInfo";
import formatNum from "@/app/utils/formatNum";
import { useState, useRef, useEffect } from "react";
import PricesChart from "./PricesChart";
import VolumeChart from "./VolumeChart";
import TimePeriodSelector from "./TimePeriodSelector";

const DuoCharts = () => {
  const [prices, setPrices] = useState<Array<[number, number]>>([]);
  const [lastPrice, setLastPrice] = useState<string>("N/A");
  const [volumes, setVolumes] = useState<number[]>([]);
  const [totalVolume, setTotalVolume] = useState<string>("N/A");
  const timePeriod = useRef("1D");

  const getData = () => {
    switch (timePeriod.current) {
      case "7D":
        return getPast7Days();
      case "14D":
        return getPast14Days();
      case "1M":
        return getPastMonth();
      case "1Y":
        return getPastYear();
      case "5Y":
        return getPast5Years();
      default:
        return getPast24Hours();
    }
  };

  const getDataFrequency = (data: Array<[number, number]>) => {
    switch (timePeriod.current) {
      case "1D":
        return data.filter((data, idx) => {
          return idx % 12 === 0;
        });
      case "1Y":
        return data.filter((data, idx) => {
          return idx % 30 === 0;
        });
      case "5Y":
        return data.filter((data, idx) => {
          return idx % 30 === 0;
        });
      default:
        return data;
    }
  };

  const handleClick = (period: string) => {
    timePeriod.current = period;
    fetchData();
  };

  const fetchData = async () => {
    const data = await getData();
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
            )
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
        <div className="flex gap-8">
          <PricesChart
            currPrice={lastPrice}
            prices={prices}
            timePeriod={timePeriod.current}
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
