"use client";

import { getTokenInfo } from "@/app/api/getTokenInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import PriceChangeContainer from "../TokenTable/PriceChangeContainer";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTheme } from "@/app/contexts/themeContext";

interface TokenInfoProps {
  token_id: string;
}

interface Links {
  homepage: string[];
  blockchain_site: string[];
}

interface ImageSizes {
  thumb: string;
  small: string;
  large: string;
}

interface FetchToken {
  symbol: string;
  name: string;
  description: string;
  links: Links;
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
  // volume_24h: number;
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

  useEffect(() => {
    const fetchData = async () => {
      const fetchedToken = await getTokenInfo(token_id);
      const token = {
        name: `${fetchedToken.name} (${fetchedToken.symbol.toUpperCase()})`,
        image: fetchedToken.image.small,
        homepage: fetchedToken.links.homepage[0],
        links: fetchedToken.links.blockchain_site.slice(0, 3),
        price: fetchedToken.market_data.current_price.usd,
        ath: fetchedToken.market_data.ath.usd,
        ath_date: fetchedToken.market_data.ath_date.usd,
        atl: fetchedToken.market_data.atl.usd,
        atl_date: fetchedToken.market_data.atl_date.usd,
        market_cap: fetchedToken.market_data.market_cap.usd,
        fully_diluted_valuation:
          fetchedToken.market_data.fully_diluted_valuation.usd,
        total_volume: fetchedToken.market_data.total_volume.usd,
        // volume_24h:
        volume_by_market:
          fetchedToken.market_data.total_volume.usd /
          fetchedToken.market_data.market_cap.usd,
        description: fetchedToken.description.en,
        max_supply: fetchedToken.market_data.max_supply,
        circulating_supply: fetchedToken.market_data.circulating_supply,
      };

      setTokenInfo(token);
    };

    fetchData();
  });

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
              <div className="flex justify-center items-center gap-4 bg-chart-volume px-6 py-4 rounded-xl">
                <Image
                  src={`/images/token-info/${currentTheme}/link.svg`}
                  alt="Link symbol"
                  width={20}
                  height={20}
                ></Image>
                <Link
                  href={tokenInfo ? tokenInfo?.homepage : ""}
                  target="_blank"
                >
                  {tokenInfo?.homepage}
                </Link>
                <Image
                  src={`/images/token-info/${currentTheme}/link.svg`}
                  alt="Copy symbol"
                  width={20}
                  height={20}
                ></Image>
              </div>
            </div>
            <div className="flex flex-col gap-6 bg-chart-volume px-14 py-10 rounded-xl">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <p className="">${tokenInfo?.price}</p>
                  <PriceChangeContainer priceChange={2} />
                </div>
                <div className="flex gap-4">
                  <p>Profit:</p>
                  <p>$2020 (do last)</p>
                </div>
              </div>
              <img src="stack icon" alt="" />
              <div>
                <div className="flex gap-4">
                  <img src="arrow" alt="" />
                  <div>
                    <div className="flex gap-4">
                      <p>All time high: </p>
                      <p className="text-xl font-medium">${tokenInfo?.ath}</p>
                    </div>
                    <div>{tokenInfo?.ath_date}</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img src="arrow" alt="" />
                  <div>
                    <div className="flex gap-4">
                      <p>All time low: </p>
                      <p className="text-xl font-medium">${tokenInfo?.atl}</p>
                    </div>
                    <div>{tokenInfo?.atl_date}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 bg-chart-volume px-14 py-10 w-[544px] rounded-xl">
            <div>
              <div className="flex gap-4">
                <div className="flex gap-3">
                  <img src="plus sign" alt="" />
                  <p>Market Cap</p>
                </div>
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
