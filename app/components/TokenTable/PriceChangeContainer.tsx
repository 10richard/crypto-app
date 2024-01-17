import greenArrow from "@/public/images/table/green-arrow.svg";
import redArrow from "@/public/images/table/red-arrow.svg";

interface PriceChangeContainerProps {
  priceChange: number;
}

const PriceChangeContainer = ({ priceChange }: PriceChangeContainerProps) => {
  return (
    <div
      className={`flex gap-1 items-center w-[72px] ${
        priceChange <= 0 ? "text-[#FF0061]" : "text-[#00B4A7]"
      }`}
    >
      <img
        src={priceChange <= 0 ? redArrow.src : greenArrow.src}
        alt="Change price arrow"
        className="w-4"
      />
      {Math.abs(priceChange)}%
    </div>
  );
};

export default PriceChangeContainer;
