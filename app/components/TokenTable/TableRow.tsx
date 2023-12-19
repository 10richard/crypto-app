import Link from "next/link";
import React from "react";
import PriceChangeContainer from "./PriceChangeContainer";

interface TableRowProps {
  token: TokenInfo;
}

interface TokenInfo {
  id: string;
  market_cap_rank: number;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
  //   Price change is in percent
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;

  // No 24h volume?
  market_cap: number;

  //   Divided circulating by total
  circulating_supply: number;
  total_supply: number;

  //    Use for graph
  sparkline_in_7d: number[];
}

const TableRow = ({ token }: TableRowProps) => {
  const roundToTenth = (num: number) => {
    return Math.round(num * 100) / 100;
  };

  const tokenRank = token.market_cap_rank;
  const tokenImage = token.image;
  const tokenName = token.name;
  const tokenSymbol = token.symbol.toUpperCase();
  const currentPrice = roundToTenth(token.current_price).toLocaleString(
    "en-US"
  );
  const priceChange1h = roundToTenth(
    token.price_change_percentage_1h_in_currency
  );
  const priceChange24h = roundToTenth(
    token.price_change_percentage_24h_in_currency
  );
  const priceChange7d = roundToTenth(
    token.price_change_percentage_7d_in_currency
  );

  return (
    <div className="flex items-center justify-between p-5 bg-[#191926] text-white rounded-xl">
      <div className="text-[#D1D1D1] w-4">{tokenRank}</div>
      <Link href={`/token-info/${token.id}`}>
        <div className="flex items-center gap-4 w-[208px]">
          <img
            src={tokenImage}
            alt={`Image of ${tokenName}`}
            className="w-[32px]"
          />
          <div className="flex flex-wrap gap-1">
            <p>{tokenName}</p>
            <p>({tokenSymbol})</p>
          </div>
        </div>
      </Link>
      <div className="w-20">${currentPrice}</div>
      {/* If percent change is positive = display up green arrow */}
      {/* If percent change is negative = display down red arrow */}
      <PriceChangeContainer priceChange={priceChange1h} />
      <PriceChangeContainer priceChange={priceChange24h} />
      <PriceChangeContainer priceChange={priceChange7d} />
      {/* <div className="w-[228px]">
        <div className="justify-between w-full">
          <p></p>
          <p></p>
        </div>
        <div className="h-[6px] w-full bg-[#5590FF]">
          <div
            className="h-full"
            style={{ width: `${btcMarketCapPercent}%` }}
          ></div>
        </div>
      </div> */}
      {/*  */}
      <div className="w-[228px]">
        {token.circulating_supply / token.total_supply}
      </div>
      <div className="w-[120px]">Graph of last 7d</div>
    </div>
  );
};

export default TableRow;
