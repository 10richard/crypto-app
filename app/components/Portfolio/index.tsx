"use client";

import { useState } from "react";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import AddAssetContainer from "./AddAssetContainer";

interface AssetInfo {
  assetName: string;
  coinAmt: number;
  amtValue: number;
  pirceChangeSincePurchase: number;
  purchaseDate: string;
}

const Portfolio = () => {
  // Fetch coin info for all available assets

  // Change the state component to redux
  // Allow user to edit asset info (coin amt and purchase date)
  // Price change since purchase --> subtract current price by bought price (difference) then divide difference by current price and multiply by 100
  const [assets, setAssets] = useState<AssetInfo[]>([]);
  const [toggleModal, setToggleModal] = useState(false);

  return (
    <MaxWidthContainer className="pt-11 pb-[70px]">
      <div className="text-xl flex justify-between items-center w-full">
        <p>Your statistics</p>
        <button
          onClick={() => setToggleModal(true)}
          className="w-[244px] py-3 rounded-md text-white bg-active-btn/50 border border-[#7878FF]"
        >
          Add Asset
        </button>
      </div>
      <div>{/* Map through available assets */}</div>
      <div className={`${toggleModal ? "" : "hidden"}`}>
        <AddAssetContainer handleToggle={setToggleModal} />
      </div>
    </MaxWidthContainer>
  );
};

export default Portfolio;
