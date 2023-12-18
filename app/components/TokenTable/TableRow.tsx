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
    <div className="flex bg-white text-black">
      <div>{token.market_cap_rank}</div>
      <div className="flex">
        <img
          src={token.image}
          alt={`Image of ${token.name}`}
          className="w-[32px]"
        />
        <div>{token.name}</div>
        <div>{token.symbol}</div>
      </div>
      <div>${token.current_price}</div>
      <div>{roundToTenth(token.price_change_percentage_1h_in_currency)}%</div>
      <div>{roundToTenth(token.price_change_percentage_24h_in_currency)}%</div>
      <div>{roundToTenth(token.price_change_percentage_7d_in_currency)}%</div>
      <div>24h volume / market cap</div>
      <div>Circulating / total supply</div>
      <div>Graph of last 7d</div>
    </div>
  );
};

export default TableRow;
