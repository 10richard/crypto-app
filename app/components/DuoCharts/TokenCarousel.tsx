import { getTop50Tokens } from "@/app/api/getTopTokens";
import PriceChangeContainer from "../TokenTable/PriceChangeContainer";
import roundToTenth from "@/app/utils/roundToTenth";
import chevronRight from "@/public/images/coins-carousel/chevron-right.svg";
import chevronLeft from "@/public/images/coins-carousel/chevron-left.svg";
import { useEffect, useState, useRef } from "react";

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

interface TokenCarouselProps {
  changeToken: (id: string) => void;
}

const TokenCarousel = ({ changeToken }: TokenCarouselProps) => {
  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [displayTokens, setDisplayTokens] = useState<TokenInfo[]>([]);
  const [activeTokens, setActiveTokens] = useState<TokenInfo>();
  const slice = useRef(0);

  const handleCarouselClick = (sequence: string) => {
    const step = 5;

    if (
      (sequence === "next" && slice.current + step >= tokens.length) ||
      (sequence === "prev" && slice.current === 0)
    )
      return;

    if (sequence === "next") {
      slice.current += step;
    } else if (sequence === "prev") {
      slice.current -= step;
    }

    setDisplayTokens(tokens.slice(slice.current, slice.current + step));
  };

  const handleClick = (token: TokenInfo) => {
    setActiveTokens(token);
    changeToken(token.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const tokens = await getTop50Tokens();
      setTokens(tokens);
      setDisplayTokens(tokens.slice(slice, slice.current + 5));
      setActiveTokens(tokens[0]);
    };
    fetchData();
  }, []);

  return (
    <div className="flex flex-col gap-6 mb-11 w-full">
      <h2>Select the currency to view statistics</h2>
      <div className="flex gap-2 relative">
        <button
          className={`p-4 bg-[#3d3d82] border border-[#7878FF] rounded-full absolute left-[-3%] translate-y-[30%] ${
            slice.current === 0 ? "hidden" : ""
          }`}
          onClick={() => handleCarouselClick("prev")}
        >
          <img src={chevronLeft.src} alt="" className="w-4 h-4" />
        </button>
        {displayTokens.map((token, idx) => (
          <button
            key={idx}
            className={`text-left flex items-center gap-4 p-4 w-full rounded-md ${
              activeTokens === token
                ? "bg-[#3d3d82] border border-[#7878FF]"
                : "bg-[#232337]"
            }`}
            onClick={() => handleClick(token)}
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
          </button>
        ))}
        <button
          className={`p-4 bg-[#3d3d82] border border-[#7878FF] rounded-full absolute right-[-3%] translate-y-[30%] ${
            slice.current === 45 ? "hidden" : ""
          }`}
          onClick={() => handleCarouselClick("next")}
        >
          <img src={chevronRight.src} alt="" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TokenCarousel;
