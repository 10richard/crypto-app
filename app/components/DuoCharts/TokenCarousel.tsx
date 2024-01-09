import PriceChangeContainer from "../TokenTable/PriceChangeContainer";
import roundToTenth from "@/app/utils/roundToTenth";
import chevronRight from "@/public/images/coins-carousel/chevron-right.svg";
import chevronLeft from "@/public/images/coins-carousel/chevron-left.svg";
import { useState, useRef, useEffect } from "react";

interface ChartData {
  prices: Array<[number, number]>;
  total_volumes: number[];
}

interface TokenSlideInfo {
  id: string;
  title: string;
  image: string;
  current_price: number;
  price_change1h: number;
  selected: boolean;
  chartData?: ChartData;
}

interface TokenCarouselProps {
  tokenSlides: TokenSlideInfo[];
  handleSelection: (tokenSlides: TokenSlideInfo[]) => void;
  handleToggle: (val: boolean) => void;
}

const TokenCarousel = ({
  tokenSlides,
  handleSelection,
  handleToggle,
}: TokenCarouselProps) => {
  const [slice, setSlice] = useState(0);

  const handleCarouselClick = (sequence: string) => {
    const step = 5;

    if (
      (sequence === "next" && slice + step >= tokenSlides.length) ||
      (sequence === "prev" && slice === 0)
    )
      return;

    if (sequence === "next") {
      setSlice(slice + step);
    } else if (sequence === "prev") {
      setSlice(slice - step);
    }
  };

  const handleTokenSelection = (token: TokenSlideInfo) => {
    // find token in tokenSlides and change selected to inverse, afterwards change it and set the new tokenSlides to tokenSelection
    const newTokens = tokenSlides.map((t) =>
      t === token || t.selected ? { ...t, selected: !t.selected } : t
    );
    console.log(newTokens);
    handleSelection(newTokens);
  };

  return (
    <div className="flex flex-col gap-6 mb-11 w-full">
      <h2>Select the currency to view statistics</h2>
      <div className="flex gap-2 relative">
        <button
          className={`p-4 bg-[#3d3d82] border border-[#7878FF] rounded-full absolute left-[-3%] translate-y-[30%] ${
            slice === 0 ? "hidden" : ""
          }`}
          onClick={() => handleCarouselClick("prev")}
        >
          <img
            src={chevronLeft.src}
            alt="Previous tokens"
            className="w-4 h-4"
          />
        </button>
        {tokenSlides.slice(slice, slice + 5).map((token, idx) => (
          <button
            key={idx}
            className={`text-left flex items-center gap-4 p-4 w-full rounded-md ${
              token.selected
                ? "bg-[#3d3d82] border border-[#7878FF]"
                : "bg-[#232337]"
            }`}
            onClick={() => handleTokenSelection(token)}
          >
            <img
              src={token.image}
              alt={`${token.title} image`}
              className="w-8 h-8"
            />
            <div>
              <p>{token.title}</p>
              <div className="flex text-sm">
                <p className="text-[#D1D1D1]">{token.current_price} USD</p>
                <PriceChangeContainer
                  priceChange={roundToTenth(token.price_change1h)}
                />
              </div>
            </div>
          </button>
        ))}
        <button
          className={`p-4 bg-[#3d3d82] border border-[#7878FF] rounded-full absolute right-[-3%] translate-y-[30%] ${
            slice === 45 ? "hidden" : ""
          }`}
          onClick={() => handleCarouselClick("next")}
        >
          <img src={chevronRight.src} alt="Next tokens" className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TokenCarousel;
