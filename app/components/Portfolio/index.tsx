"use client";

import { useEffect, useState } from "react";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import { getTokenInfo } from "@/app/api/getTokenInfo";
import AddAssetContainer from "./AddAssetContainer";
import AssetContainer from "./AssetContainer";
import { getAllTokens } from "@/app/api/getAllTokens";

// Have 2 different interfaces/states?
interface AssetInfo {
  id: string;
  name: string;
  current_price: number;
  coinAmt: number;
  amtValue: number;
  pirceChangeSincePurchase: number;
  purchaseDate: string;
}

const Portfolio = () => {
  // Change the state component to redux
  // Allow user to edit asset info (coin amt and purchase date)
  // Price change since purchase --> subtract current price by bought price (difference) then divide difference by current price and multiply by 100
  const [assets, setAssets] = useState<AssetInfo[]>([]);
  const [toggleModal, setToggleModal] = useState(false);
  const [allTokens, setAllTokens] = useState([]);
  // Get unique assets (4 entries for bitcoin, no need to fetch 4 times) --> After you get unique entries, fetch current data
  const [uniqueAssets, setUniqueAssets] = useState([]);

  const fetchTokenInfo = async (asset: AssetInfo) => {
    const data = await getTokenInfo(asset.id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTokens();
    };

    fetchData();
  }, []);

  useEffect(() => {
    // fetch current data for tokens
    const fetchData = async () => {
      const data = await Promise.all(uniqueAssets.map(fetchTokenInfo));
    };

    fetchData();
  }, [assets]);

  // Fetch coin info for all saved assets

  return (
    <MaxWidthContainer className="pt-11 pb-[70px]">
      <div className="flex justify-between items-center w-full">
        <p className="text-2xl">Portfolio</p>
        <button
          onClick={() => setToggleModal(true)}
          className="w-[244px] py-3 rounded-md text-white bg-active-btn/50 border border-[#7878FF]"
        >
          Add Asset
        </button>
      </div>
      <div>
        {/* Map through saved assets */}
        {assets.map((asset) => (
          <AssetContainer key={asset.id} asset={asset} />
        ))}
      </div>
      <div className={`${toggleModal ? "" : "hidden"}`}>
        <AddAssetContainer handleToggle={setToggleModal} />
      </div>
    </MaxWidthContainer>
  );
};

export default Portfolio;
