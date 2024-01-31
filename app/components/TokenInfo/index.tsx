"use client";

import { getTokenInfo } from "@/app/api/getTokenInfo";
import { useEffect, useState } from "react";
import PriceChangeContainer from "../PriceChangeContainer";
import { useRouter } from "next/navigation";
import { useTheme } from "@/app/contexts/themeContext";
import LinkContainer from "./LinkContainer";
import AllTimeContainer from "./AllTimeContainer";
import { useCurrency } from "@/app/contexts/currencyContext";
import MarketDataContainer from "./MarketDataContainer";
import Image from "next/image";
import formatNum from "@/app/utils/formatNum";
import ProgressBar from "../ProgressBar";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import DescriptionContainer from "./DescriptionContainer";

interface TokenInfoProps {
  token_id: string;
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
  circulating_by_max: number;
}

const TokenInfo = ({ token_id }: TokenInfoProps) => {
  const router = useRouter();
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
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
        price: fetchedToken.market_data.current_price[currentCurrency.abbr],
        ath: fetchedToken.market_data.ath[currentCurrency.abbr],
        ath_date: fetchedToken.market_data.ath_date[currentCurrency.abbr],
        atl: fetchedToken.market_data.atl[currentCurrency.abbr],
        atl_date: fetchedToken.market_data.atl_date[currentCurrency.abbr],
        market_cap: fetchedToken.market_data.market_cap[currentCurrency.abbr],
        fully_diluted_valuation:
          fetchedToken.market_data.fully_diluted_valuation[
            currentCurrency.abbr
          ],
        total_volume:
          fetchedToken.market_data.total_volume[currentCurrency.abbr],
        volume_by_market:
          fetchedToken.market_data.total_volume[currentCurrency.abbr] /
          fetchedToken.market_data.market_cap[currentCurrency.abbr],
        description: fetchedToken.description.en,
        circulating_supply: fetchedToken.market_data.circulating_supply,
        max_supply:
          fetchedToken.market_data.max_supply === null
            ? "N/A"
            : fetchedToken.market_data.max_supply,
        circulating_by_max:
          (fetchedToken.market_data.circulating_supply /
            fetchedToken.market_data.max_supply) *
          100,
      };

      setTokenInfo(token);
    };

    fetchData();
  }, [currentCurrency]);

  return (
    <div className="flex justify-center mt-14">
      <MaxWidthContainer className="flex flex-col gap-[80px] pb-[72px]">
        <div>
          <div className="mb-10">
            <button
              className="flex items-center gap-3"
              onClick={() => router.back()}
            >
              <Image
                src={`/images/token-info/${currentTheme}/arrow-back.svg`}
                alt="Arrow back"
                width={35}
                height={35}
              ></Image>
              <p className="text-lg">Back</p>
            </button>
          </div>
          <div className="flex justify-between gap-10">
            <div>
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
                        {currentCurrency.symbol}
                        {tokenInfo?.price.toLocaleString()}
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
                      price={`${currentCurrency.symbol}${tokenInfo?.ath}`}
                      date={tokenInfo?.ath_date}
                    />
                    <AllTimeContainer
                      title="low"
                      price={`${currentCurrency.symbol}${tokenInfo?.atl}`}
                      date={tokenInfo?.atl_date}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 bg-chart-volume px-14 py-10 max-w-[544px] w-full rounded-xl">
              <div className="flex flex-col gap-4">
                <MarketDataContainer
                  title="Market Cap"
                  currency={currentCurrency.symbol}
                  value={tokenInfo?.market_cap}
                />
                <MarketDataContainer
                  title="Fully Diluted Valuation"
                  currency={currentCurrency.symbol}
                  value={tokenInfo?.fully_diluted_valuation}
                />
                <MarketDataContainer
                  title="Volume/Market"
                  value={tokenInfo?.volume_by_market}
                />
              </div>
              <div className="flex flex-col gap-4">
                <MarketDataContainer
                  title="Total Volume"
                  value={`${tokenInfo?.total_volume.toLocaleString()} ${
                    tokenInfo?.name.split(" ")[1]
                  }`}
                />
                <MarketDataContainer
                  title="Circulating Supply"
                  value={`${tokenInfo?.circulating_supply.toLocaleString()} ${
                    tokenInfo?.name.split(" ")[1]
                  }`}
                />
                <MarketDataContainer
                  title="Max Supply"
                  value={`${tokenInfo?.max_supply.toLocaleString()} ${
                    tokenInfo?.name.split(" ")[1]
                  }`}
                />
              </div>
              <ProgressBar
                left_text={`${formatNum(
                  tokenInfo ? 100 - tokenInfo.circulating_by_max : 0
                )}%`}
                right_text={`${formatNum(
                  tokenInfo ? tokenInfo?.circulating_by_max : 100
                )}%`}
                percent={tokenInfo ? tokenInfo.circulating_by_max : 0}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <DescriptionContainer
            desc={tokenInfo ? tokenInfo?.description : ""}
          />
          <div className="flex flex-col gap-6 pt-12 max-w-[544px] w-full">
            {tokenInfo?.links.map((link) => (
              <LinkContainer
                key={link}
                link={link}
                currentTheme={currentTheme}
              />
            ))}
          </div>
        </div>
      </MaxWidthContainer>
    </div>
  );
};

export default TokenInfo;
