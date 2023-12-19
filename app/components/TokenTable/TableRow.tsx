import React from "react";

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

  return (
    <div className="flex items-center gap-5 p-5 bg-[#191926] text-white rounded-xl">
      <div className="text-[#D1D1D1] w-4">{token.market_cap_rank}</div>
      <div className="flex items-center gap-4 w-[208px]">
        <img
          src={token.image}
          alt={`Image of ${token.name}`}
          className="w-[32px]"
        />
        <div className="flex flex-wrap gap-1">
          <p>{token.name}</p>
          <p>({token.symbol.toUpperCase()})</p>
        </div>
      </div>
      <div className="w-20">
        ${roundToTenth(token.current_price).toLocaleString("en-US")}
      </div>
      {/* If percent change is positive = display up green arrow */}
      {/* If percent change is negative = display down red arrow */}
      <div className="w-[72px]">
        {roundToTenth(token.price_change_percentage_1h_in_currency)}%
      </div>
      <div className="w-[72px]">
        {roundToTenth(token.price_change_percentage_24h_in_currency)}%
      </div>
      <div className="w-[72px]">
        {roundToTenth(token.price_change_percentage_7d_in_currency)}%
      </div>
      <div className="w-[228px]">24h volume / market cap</div>
      <div className="w-[228px]">Circulating / total supply</div>
      <div className="w-[120px]">Graph of last 7d</div>
    </div>
  );
};

export default TableRow;
