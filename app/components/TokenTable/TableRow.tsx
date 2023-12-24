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
  total_volume: number;
  market_cap: number;

  //   Divided circulating by total
  circulating_supply: number;
  total_supply: number;

  //    Use for graph
  sparkline_in_7d: number[];
}

const TableRow = ({ token }: TableRowProps) => {
  const formatNum = (num: number): string => {
    if (num >= 1_000_000_000_000) {
      return `${(num / 1_000_000_000_000).toFixed(2)}T`;
    } else if (num >= 1_000_000_000) {
      return `${(num / 1_000_000_000).toFixed(2)}B`;
    } else if (num >= 1_000_000) {
      return `${(num / 1_000_000).toFixed(2)}M`;
    } else {
      return num === null ? "NaN" : num.toLocaleString();
    }
  };

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
  const volumeTurnover = (token.total_volume / token.market_cap) * 100;
  const circulatingSupplyRatio =
    (token.circulating_supply / token.total_supply) * 100;

  return (
    <div className="flex items-center justify-between my-2 gap-5 p-5 bg-[#191926] text-white rounded-xl">
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
      <div className="flex flex-col gap-1 w-[228px]">
        <div className="text-xs flex justify-between">
          <p className="text-[#5E74C9]">${formatNum(token.total_volume)}</p>
          <p>${formatNum(token.market_cap)}</p>
        </div>
        <div className="h-[6px] w-full bg-[#3C4777] rounded-xl overflow-hidden">
          <div
            className={`h-full bg-[#5E74C9]`}
            style={{ width: `${volumeTurnover}%` }}
          ></div>
        </div>
      </div>
      <div className="text-xs flex flex-col gap-1 w-[228px]">
        <div className="flex justify-between">
          <p className="text-[#5E74C9]">
            ${formatNum(token.circulating_supply)}
          </p>
          <p>${formatNum(token.total_supply)}</p>
        </div>
        <div className="h-[6px] w-full bg-[#3C4777] rounded-xl overflow-hidden">
          <div
            className={`h-full bg-[#5E74C9]`}
            style={{ width: `${circulatingSupplyRatio}%` }}
          ></div>
        </div>
      </div>
      <div className="w-[120px]">Graph of last 7d</div>
    </div>
  );
};

export default TableRow;
