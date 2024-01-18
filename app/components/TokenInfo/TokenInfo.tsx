"use client";

import { getTokenInfo } from "@/app/api/getTokenInfo";
import Link from "next/link";
import { useEffect, useState } from "react";
import PriceChangeContainer from "../TokenTable/PriceChangeContainer";

interface TokenInfoProps {
  token: string;
}

const TokenInfo = ({ token }: TokenInfoProps) => {
  const tokenInfoMap = {
    name: "",
    homepage_link: "",
    marketcap: "",
    description: <></>,
    links: [],
    ath: "",
    atl: "",
  };
  const [name, setName] = useState("");
  const [homepage, setHomepage] = useState("");
  const [marketcap, setMarketcap] = useState("");
  const [description, setDescription] = useState(<></>);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const tokenInfo = await getTokenInfo(token);
      //   tokenInfoMap.name = tokenInfo.name;
      // setName(`${tokenInfo.name} (${tokenInfo.symbol.toUpperCase()})`);
      //   setHomepage(tokenInfo.links.homepage[0]);
      //   setDescription(tokenInfo.description.en);
      //   setLinks(tokenInfo.links.blockchain_site.slice(0, 3));
    };

    fetchData();
  });

  return (
    <div className="flex justify-center">
      <div className="flex flex-col max-w-[1296px] w-full">
        <div className="flex justify-between">
          <div className="flex gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6 bg-blue-500 px-14 py-10">
                <img src="token logo" alt="" />
                <h2>Token Name</h2>
              </div>
              <div className="bg-blue-500 px-6 py-4">
                <Link href={"google.com"} target="_blank">
                  Homepage
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6 bg-blue-500 px-14 py-10">
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
          <div className="flex flex-col gap-8 bg-blue-500 px-14 py-10 w-[544px]">
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
