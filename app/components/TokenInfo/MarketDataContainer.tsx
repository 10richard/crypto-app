import Image from "next/image";

interface MarketDataContainerProps {
  currentTheme: string;
}

const MarketDataContainer = ({ currentTheme }: MarketDataContainerProps) => {
  // For most right hand info
  return (
    <div className="flex gap-3">
      <Image
        src={`/images/token-info/${currentTheme}/add-sign.svg`}
        alt="Add symbol"
        width={16}
        height={16}
      ></Image>
      <p>Market Cap</p>
    </div>
  );
};

export default MarketDataContainer;
