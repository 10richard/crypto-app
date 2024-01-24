"use client";

import { getTokenInfo } from "@/app/api/getTokenInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import PriceChangeContainer from "../TokenTable/PriceChangeContainer";
import { useRouter } from "next/navigation";

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
  // image: string;
  // homepage: string;
  // links: string[];
  // price: number;
  // ath: number;
  // ath_date: string;
  // atl: number;
  // atl_date: string;
  // description: string;
  // market_cap: number;
  // fully_diluted_valuation: number;
  // volume_24h: number;
  // volume_by_market: number;
  // total_volume: number;
  // circulating_supply: number;
  // max_supply: number;
}

const TokenInfo = ({ token_id }: TokenInfoProps) => {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo>();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const fetchedToken = await getTokenInfo(token_id);
      const token = {
        name: `${fetchedToken.name} (${fetchedToken.symbol.toUpperCase()})`,
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
              <div className="flex flex-col gap-6 bg-chart-volume px-14 py-10">
                <img src="token logo" alt="" />
                <h2>{tokenInfo?.name}</h2>
              </div>
              <div className="bg-chart-volume px-6 py-4">
                <Link href={"google.com"} target="_blank">
                  Homepage
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 bg-chart-volume px-14 py-10">
              <div className="flex flex-col gap-5">
                <div className="flex gap-4">
                  <p>Token Price</p>
                  <PriceChangeContainer priceChange={2} />
                </div>
                <div className="flex gap-4">
                  <p>Profit:</p>
                  <p>$2020</p>
                </div>
              </div>
              <img src="stack icon" alt="" />
              <div>
                <div className="flex gap-4">
                  <img src="arrow" alt="" />
                  <div>
                    <div className="flex gap-4">
                      <p>All time high: </p>
                      <p className="text-xl font-medium">$230</p>
                    </div>
                    <div>Wed, 14 Sep 2023 11:54:46 GMT</div>
                  </div>
                </div>
                <div className="flex gap-4">
                  <img src="arrow" alt="" />
                  <div>
                    <div className="flex gap-4">
                      <p>All time low: </p>
                      <p className="text-xl font-medium">$230</p>
                    </div>
                    <div>Wed, 14 Sep 2023 11:54:46 GMT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-8 bg-chart-volume px-14 py-10 w-[544px]">
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
