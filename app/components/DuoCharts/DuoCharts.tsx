"use client";

import { getPast30Days } from "@/app/api/getBitcoinInfo";
import formatNum from "@/app/utils/formatNum";
import { useState, useEffect } from "react";
import PricesChart from "./PricesChart";
import VolumeChart from "./VolumeChart";

const DuoCharts = () => {
  const [prices, setPrices] = useState([]);
  const [lastPrice, setLastPrice] = useState<string>("N/A");
  const [volumes, setVolumes] = useState([]);
  const [totalVolume, setTotalVolume] = useState<string>("N/A");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPast30Days();
      setPrices(data.prices);
      setLastPrice(formatNum(data.prices[data.prices.length - 1][1]));
      setVolumes(data.total_volumes.map((arr: Array<number>) => arr[1]));
      setTotalVolume(
        formatNum(
          data.total_volumes.reduce(
            (sum: number, curr: Array<number>) => sum + curr[1],
            0
          )
        )
      );
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center mt-[72px]">
      <div className="flex gap-8 max-w-[1296px]">
        <PricesChart currPrice={lastPrice} prices={prices} />
        <VolumeChart totalVolume={totalVolume} volumes={volumes} />
      </div>
    </div>
  );
};

export default DuoCharts;
