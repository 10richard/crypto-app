import { getTop50Tokens } from "@/app/api/getTopTokens";
import { useEffect, useState } from "react";
import PriceChangeContainer from "../TokenTable/PriceChangeContainer";

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

  useEffect(() => {
    const fetchData = async () => {
      const tokens = await getTop50Tokens();
      setTokens(tokens);
    };
    fetchData();
  });

  return (
    <div className="flex flex-col gap-6">
      <h2>Select the currency to view statistics</h2>
      <div className="flex gap-2">
        {tokens.map((token, idx) => (
          <div key={idx} className="flex">
            <img src={token.image} alt="" />
            <div>
              <p>
                {token.name} ({token.symbol.toUpperCase()})
              </p>
              <div>
                {/* From what time? - 1h, 24h, 7d */}
                <p>{token.current_price}</p>
                <PriceChangeContainer
                  priceChange={token.price_change_percentage_1h_in_currency}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenList;
