"use client";

import getTodayDateTime from "@/app/utils/getTodayDateTime";
import PricesChart from "../DuoCharts/PricesChart";
import TimePeriodSelector from "../DuoCharts/TimePeriodSelector";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import TokenContainer from "./TokenContainer";
import Image from "next/image";
import { useTheme } from "@/app/contexts/themeContext";

// Get past data for left and right token
// Divide each price point of left by right
// Graph the result

// User can only select from the top 50 tokens?
//
const Converter = () => {
  const { currentTheme } = useTheme();

  return (
    <MaxWidthContainer className="pt-11 pb-[70px]">
      <div className="mb-6">
        <h2 className="text-xl">Online currency convertor</h2>
        <p className="text-[#9E9E9E]">{getTodayDateTime()}</p>
      </div>
      <div>
        <div className="flex gap-6 w-full relative">
          <TokenContainer />
          <TokenContainer />
          {/* <div className="flex flex-col p-6 w-1/2">
            <h3>You buy</h3>
            <div>
              <div>
                <div>
                  <img src="token logo" alt="" />
                  <p>Ethereum (ETH)</p>
                  <img src="chevron down" alt="" />
                </div>
                <input type="text" />
              </div>
              <div className="border border-t-[1px]"></div>
            </div>
          </div> */}
          <button className="bg-content-main p-3 w-[48px] h-[48px] absolute right-0 left-0 mx-auto top-1/2 -translate-y-1/2 rounded-full">
            {/* Does the converter btn serve a purpose? Or is just there for decoration? */}
            <Image
              src={`/images/converter/${currentTheme}/converter-icon.svg`}
              alt="Converter icon"
              width={24}
              height={24}
            ></Image>
          </button>
        </div>
        <div>
          {/* <PricesChart /> */}
          {/* <TimePeriodSelector /> */}
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default Converter;
