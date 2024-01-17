"use client";

import { useEffect, useState } from "react";
import { getHeaderInfo } from "../api/getHeaderInfo";
import flashCicle from "@/public/images/header/flash-circle.svg";
import exchange from "@/public/images/header/exchange.svg";
import btc from "@/public/images/header/bitcoin.svg";
import eth from "@/public/images/header/eth.svg";
import greenArrow from "@/public/images/header/green-arrow.svg";

const Header = () => {
  const [activeCoins, setActiveCoins] = useState<number>(0);
  const [totalMarkets, setTotalMarkets] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<string>("");
  const [totalVolume, setTotalVolume] = useState<string>("");
  const [volumePercent, setVolumePercent] = useState<number>(0);
  const [btcMarketCapPercent, setBtcMarketCapPercent] = useState<number>(0);
  const [ethMarketCapPercent, setEthMarketCapPercent] = useState<number>(0);

  const formatNum = (num: number): string => {
    if (num >= 1_000_000_000_000) {
      return `${(num / 1_000_000_000_000).toFixed(2)}T`;
    } else if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`;
    } else {
      return num.toLocaleString();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHeaderInfo();
      setActiveCoins(data.active_cryptocurrencies);
      setTotalMarkets(data.markets);
      setMarketCap(formatNum(data.total_market_cap.usd));
      setTotalVolume(formatNum(data.total_volume.usd));
      setVolumePercent(
        (data.total_volume.usd / data.total_market_cap.usd) * 100
      );
      setBtcMarketCapPercent(Math.round(data.market_cap_percentage.btc));
      setEthMarketCapPercent(Math.round(data.market_cap_percentage.eth));
    };

    fetchData();
  }, []);

  return (
    <header className="text-sm flex justify-center gap-10 py-4 bg-header">
      <div className="flex items-center gap-2">
        <img
          src={flashCicle.src}
          alt="Active coins icons"
          className="w-[20px]"
        />
        <p className="text-[#D1D1D1]">Coins</p>
        <p>{activeCoins}</p>
      </div>
      <div className="flex items-center gap-2">
        <img src={exchange.src} alt="Total markets icon" className="w-[20px]" />
        <p className="text-[#D1D1D1]">Exchange</p>
        <p>{totalMarkets}</p>
      </div>
      <div className="flex items-center gap-1">
        <img src={greenArrow.src} alt="Green arrow" />
        <p>{marketCap}</p>
      </div>
      <div className="flex items-center gap-2">
        <p>${totalVolume}</p>
        <div className="h-[6px] w-[53px] bg-[#787585] rounded-xl overflow-hidden">
          <div
            className={`h-full bg-white`}
            style={{ width: `${volumePercent}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img src={btc.src} alt="" className="w-[25px]" />
        <p>{btcMarketCapPercent}%</p>
        <div className="h-[6px] w-[53px] bg-[#787585] rounded-xl overflow-hidden">
          <div
            className={`h-full bg-[#F7931A]`}
            style={{ width: `${btcMarketCapPercent}%` }}
          ></div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <img src={eth.src} alt="" className="w-[25px]" />
        <p>{ethMarketCapPercent}%</p>
        <div className="h-[6px] w-[53px] bg-[#787585] rounded-xl overflow-hidden">
          <div
            className={`h-full bg-[#849DFF]`}
            style={{ width: `${ethMarketCapPercent}%` }}
          ></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
