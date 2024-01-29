import Image from "next/image";
import { useTheme } from "@/app/contexts/themeContext";

interface MarketDataContainerProps {
  title: string;
  value: number | undefined;
}

const MarketDataContainer = ({ title, value }: MarketDataContainerProps) => {
  const { currentTheme } = useTheme();

  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-3">
        <Image
          src={`/images/token-info/${currentTheme}/info-icon.svg`}
          alt="Add symbol"
          width={32}
          height={32}
        ></Image>
        <p>{title}</p>
      </div>
      <p className="text-xl font-medium">{value?.toLocaleString()}</p>
    </div>
  );
};

export default MarketDataContainer;
