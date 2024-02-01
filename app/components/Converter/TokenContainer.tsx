import Image from "next/image";
import { useCurrency } from "@/app/contexts/currencyContext";

interface TokenContainerProps {
  title: string;
  tokenImg: string;
  token: string;
  price: number;
  currentTheme: string;
  bgColor: string;
}

const TokenContainer = ({
  title,
  tokenImg,
  token,
  price,
  currentTheme,
  bgColor,
}: TokenContainerProps) => {
  const { currentCurrency } = useCurrency();

  return (
    <div className={`flex flex-col gap-10 p-6 w-1/2 rounded-2xl ${bgColor}`}>
      <h3 className="text-sm text-content-main/80">{title}</h3>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <div className="flex items-center gap-1">
            <Image
              src={tokenImg}
              alt={`${token} Image`}
              width={25}
              height={25}
            ></Image>
            <p className="text-xl font-medium">{token}</p>
            <Image
              src={`/images/navbar/${currentTheme}/chevron-down.svg`}
              alt="Chevron down"
              width={20}
              height={20}
            ></Image>
          </div>
          <input
            type="text"
            className="text-2xl font-bold bg-transparent text-right outline-none"
            value={2}
          />
        </div>
        <div className="p-2 border-t-[1px]">
          <p>
            <span className="text-content-main/80">1 BTC =</span>{" "}
            {currentCurrency.symbol}
            {price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TokenContainer;
