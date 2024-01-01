import { getTop50Tokens } from "@/app/api/getTopTokens";
import PriceChangeContainer from "../TokenTable/PriceChangeContainer";
import roundToTenth from "@/app/utils/roundToTenth";
import chevronRight from "@/public/images/coins-carousel/chevron-right.svg";
import chevronLeft from "@/public/images/coins-carousel/chevron-left.svg";
import { useEffect, useState } from "react";

interface TokenInfo {
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
}

const TokenList = () => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [displayTokens, setDiplayTokens] = useState<TokenInfo[]>([]);
  const [activeTokens, setActiveTokens] = useState<TokenInfo[]>([]);

  const handleClick = (sequence: string) => {
    // display next 5 or previous 5 depending on
  };

  useEffect(() => {
    const fetchData = async () => {
      const tokens = await getTop50Tokens();
      setTokens(tokens);
      setDiplayTokens(tokens.slice(0, 5));
      setActiveTokens([...activeTokens, tokens[0]]);
    };
    fetchData();
  });

  return (
    <div className="flex flex-col gap-6 mb-11 w-full">
      <h2>Select the currency to view statistics</h2>
      <div className="flex gap-2 relative">
        <button
          className="p-4 bg-[#3d3d82] border border-[#7878FF] rounded-full absolute left-[-3%] translate-y-[30%]"
          onClick={() => handleClick("next")}
        >
          <img src={chevronLeft.src} alt="" />
        </button>
        {displayTokens.map((token, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-4 p-4 w-full rounded-md ${
              activeTokens.includes(token)
                ? "bg-[#3d3d82] border border-[#7878FF]"
                : "bg-[#232337]"
            }`}
          >
            <img
              src={token.image}
              alt={`${token.name} image`}
              className="w-8 h-8"
            />
            <div>
              <p>
                {token.name} ({token.symbol.toUpperCase()})
              </p>
              <div className="flex text-sm">
                <p className="text-[#D1D1D1]">{token.current_price} USD</p>
                <PriceChangeContainer
                  priceChange={roundToTenth(
                    token.price_change_percentage_1h_in_currency
                  )}
                />
              </div>
            </div>
          </div>
        ))}
        <button
          className="p-4 bg-[#3d3d82] border border-[#7878FF] rounded-full absolute right-[-3%] translate-y-[30%]"
          onClick={() => handleClick("next")}
        >
          <img src={chevronRight.src} alt="" />
        </button>
      </div>
    </div>
  );
};

export default TokenList;
