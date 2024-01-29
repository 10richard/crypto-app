"use client";

import { getTokenInfo } from "@/app/api/getTokenInfo";
import { useEffect, useState } from "react";
import PriceChangeContainer from "../TokenTable/PriceChangeContainer";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/themeContext";
import LinkContainer from "./LinkContainer";
import AllTimeContainer from "./AllTimeContainer";
import { useCurrency } from "@/app/contexts/currencyContext";

interface TokenInfoProps {
  token_id: string;
}

interface Links {
  homepage: string[];
  blockchain_site: string[];
}

interface TokenInfo {
  name: string;
  image: string;
  homepage: string;
  links: string[];
  price: number;
  ath: number;
  ath_date: string;
  atl: number;
  atl_date: string;
  market_cap: number;
  fully_diluted_valuation: number;
  volume_by_market: number;
  total_volume: number;
  description: string;
  max_supply: number;
  circulating_supply: number;
}

const TokenInfo = ({ token_id }: TokenInfoProps) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
  const router = useRouter();
  const { currentTheme } = useTheme();
  const { currentCurrency } = useCurrency();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedToken = await getTokenInfo(token_id);
      const token = {
        name: `${fetchedToken.name} (${fetchedToken.symbol.toUpperCase()})`,
        image: fetchedToken.image.small,
        homepage: fetchedToken.links.homepage[0],
        links: fetchedToken.links.blockchain_site.slice(0, 3),
        price: fetchedToken.market_data.current_price[currentCurrency],
        ath: fetchedToken.market_data.ath[currentCurrency],
        ath_date: fetchedToken.market_data.ath_date[currentCurrency],
        atl: fetchedToken.market_data.atl[currentCurrency],
        atl_date: fetchedToken.market_data.atl_date[currentCurrency],
        market_cap: fetchedToken.market_data.market_cap[currentCurrency],
        fully_diluted_valuation:
          fetchedToken.market_data.fully_diluted_valuation[currentCurrency],
        total_volume: fetchedToken.market_data.total_volume[currentCurrency],
        volume_by_market:
          fetchedToken.market_data.total_volume[currentCurrency] /
          fetchedToken.market_data.market_cap[currentCurrency],
        description: fetchedToken.description.en,
        max_supply: fetchedToken.market_data.max_supply,
        circulating_supply: fetchedToken.market_data.circulating_supply,
      };

      setTokenInfo(token);
    };

    fetchData();
  }, [currentCurrency]);

  return (
    <div className="flex justify-center mt-14">
      <div className="flex flex-col max-w-[1296px] w-full">
        <div>
          <button onClick={() => router.back()}>Back</button>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              <div className="text-center flex flex-col items-center gap-6 bg-chart-volume px-14 py-10 rounded-xl">
                <div className="bg-[#2C2C4D] p-4 rounded-lg">
                  <img
                    src={tokenInfo?.image}
                    alt={`${tokenInfo?.name} image`}
                    className="w-8 h-8"
                  />
                </div>
                <h2 className="text-center text-3xl font-bold">
                  {tokenInfo?.name}
                </h2>
              </div>
              <LinkContainer
                link={tokenInfo ? tokenInfo?.homepage : ""}
                currentTheme={currentTheme}
              />
            </div>
            <div className="flex flex-col gap-6 bg-chart-volume px-14 py-10 rounded-xl">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <p className="text-4xl font-bold">
                    ${tokenInfo?.price.toLocaleString()}
                  </p>
                  <PriceChangeContainer priceChange={2} />
                </div>
                <div className="flex items-center gap-4">
                  <p>Profit:</p>
                  <p className="text-2xl text-[#00F5E4]">$2020 (do last)</p>
                </div>
              </div>
              <img src="stack icon" alt="" />
              <div className="flex flex-col gap-6">
                <AllTimeContainer
                  title="high"
                  price={tokenInfo?.ath}
                  date={tokenInfo?.ath_date}
                />
                <AllTimeContainer
                  title="low"
                  price={tokenInfo?.atl}
                  date={tokenInfo?.atl_date}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 bg-chart-volume px-14 py-10 w-[544px] rounded-xl">
            <div>
              <div className="flex gap-4">
                <div>
                  <p>$749,864,345,056</p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex gap-4">
                <div className="flex gap-3">
                  <img src="plus sign" alt="" />
                  <p>Total Volume</p>
                </div>
                <div>
                  <p>$749,864,345,056</p>
                </div>
              </div>
            </div>
            <div>Progress bar</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenInfo;
