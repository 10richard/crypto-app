import PriceChangeContainer from "../TokenTable/PriceChangeContainer";
import roundToTenth from "@/app/utils/roundToTenth";
import chevronRight from "@/public/images/coins-carousel/chevron-right.svg";
import chevronLeft from "@/public/images/coins-carousel/chevron-left.svg";
import compareIcon from "@/public/images/coins-carousel/compare-icon.svg";
import exitIcon from "@/public/images/coins-carousel/exit-icon.svg";
import { useState } from "react";

interface TokenSlide {
  id: string;
  title: string;
  image: string;
  current_price: number;
  price_change1h: number;
  selected: boolean;
  chartData?: {
    volume_summation?: string;
    prices: Array<[number, number]>;
    total_volumes: number[];
  };
}

interface TokenCarouselProps {
  tokenSlides: TokenSlide[];
  handleSelection: (tokenSlides: TokenSlide[]) => void;
}

const TokenCarousel = ({
  tokenSlides,
  handleSelection,
}: TokenCarouselProps) => {
  const [slice, setSlice] = useState(0);
  const [toggleCompare, setToggleCompare] = useState(false);

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

  const handleTokenSelection = (token: TokenSlide) => {
    const activeTokens = tokenSlides.filter((t) => t.selected);

    if (activeTokens.length === 1 && activeTokens.includes(token)) return;

    let newTokens = tokenSlides;

    if (toggleCompare) {
      if (activeTokens.includes(token)) {
        newTokens = tokenSlides.map((t) =>
          t === token ? { ...t, selected: false } : t
        );
      } else {
        newTokens = tokenSlides.map((t) =>
          t === token ? { ...t, selected: !t.selected } : t
        );
      }
    } else {
      newTokens = tokenSlides.map((t) =>
        t === token || t.selected ? { ...t, selected: !t.selected } : t
      );
    }

    handleSelection(newTokens);
  };

  const handleToggle = () => {
    if (toggleCompare) {
      const newTokens = tokenSlides.map((t, idx) =>
        idx === 0 ? { ...t, selected: true } : { ...t, selected: false }
      );
      handleSelection(newTokens);
    }

    setToggleCompare(!toggleCompare);
  };

  return (
    <div className="flex flex-col gap-6 mb-11 w-full">
      <div className="flex justify-between">
        <h2>Select the currency to view statistics</h2>
        <button
          onClick={handleToggle}
          className="flex items-center gap-3 px-6 py-3 bg-inactive-btn rounded-md"
        >
          {/* Add light themed images */}
          <img
            src={toggleCompare ? exitIcon.src : compareIcon.src}
            alt="Compare Icon"
            className="w-6 h-6"
          />
          <p className="text-content-main text-sm">
            {toggleCompare ? "Exit Comparison" : "Compare"}
          </p>
        </button>
      </div>
      <div className="flex gap-2 relative">
        <button
          className={`p-4 bg-active-btn/50 border border-[#7878FF] rounded-full absolute left-[-3%] translate-y-[30%] ${
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
                ? "bg-active-btn/50 border border-[#7878FF]"
                : "bg-inactive-btn"
            } ${
              !token.selected &&
              tokenSlides.filter((t) => t.selected).length >= 3
                ? "cursor-not-allowed"
                : ""
            }`}
            onClick={() => handleTokenSelection(token)}
            disabled={
              !token.selected &&
              tokenSlides.filter((t) => t.selected).length >= 3
            }
          >
            <img
              src={token.image}
              alt={`${token.title} image`}
              className="w-8 h-8"
            />
            <div>
              <p>{token.title}</p>
              <div className="flex text-sm">
                <p className="text-content-sub">{token.current_price} USD</p>
                <PriceChangeContainer
                  priceChange={roundToTenth(token.price_change1h)}
                />
              </div>
            </div>
          </button>
        ))}
        <button
          className={`p-4 bg-active-btn/50 border border-[#7878FF] rounded-full absolute right-[-3%] translate-y-[30%] ${
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
