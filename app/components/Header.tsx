"use client";

import { useEffect, useState } from "react";
import { getHeaderInfo } from "../api/getHeaderInfo";

const Header = () => {
  //Display Amount of coins, exchange, volume, etc. - will have to fetch data from coingecko
  const [activeCoins, setActiveCoins] = useState("");
  const [totalMarkets, setTotalMarkets] = useState("");
  // const [totalMarketCap, setTotalMarketCap] = useState("");
  // const [totalVolume, setTotalVolume] = useState("");
  const [btcMarketCapPercent, setBtcMarketCapPercent] = useState("");
  const [ethMarketCapPercent, setEthMarketCapPercent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getHeaderInfo();
      setActiveCoins(data.active_cryptocurrencies);
      setTotalMarkets(data.markets);
      // setTotalMarketCap(data.total_market_cap);
      // setTotalVolume(data.total_volume);
      setBtcMarketCapPercent(data.market_cap_percentage.btc);
      setEthMarketCapPercent(data.market_cap_percentage.eth);
    };

    fetchData();
  }, []);

  return (
    <header className="flex">
      <div>Active Coins: {activeCoins}</div>
      <div>Exchange: {totalMarkets}</div>
      {/* <div>Market Cap: {totalMarketCap}</div> */}
      {/* <div>Volume: {totalVolume}</div> */}
      <div>BTC Market Cap: {btcMarketCapPercent}</div>
      <div>ETH Market Cap: {ethMarketCapPercent}</div>
    </header>
  );
};

export default Header;
