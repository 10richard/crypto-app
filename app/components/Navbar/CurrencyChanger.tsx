import Image from "next/image";
import { useState } from "react";
import { useAppSelector, useAppDispatch } from "@/app/lib/hooks";
import { updateCurrency } from "@/app/lib/features/currency";

interface CurrencyChangerProps {
  currentTheme: string;
}

interface Currency {
  abbr: string;
  symbol: string;
}

const CurrencyChanger = ({ currentTheme }: CurrencyChangerProps) => {
  const [isActive, setIsActive] = useState(false);
  const currentCurrency = useAppSelector((state) => state.currency);
  const dispatch = useAppDispatch();
  const currencies = [
    { abbr: "usd", symbol: "$" },
    { abbr: "gbp", symbol: "£" },
    { abbr: "eur", symbol: "€" },
    { abbr: "btc", symbol: "₿" },
    { abbr: "eth", symbol: "Ξ" },
  ];

  const handleCurrencyClick = (currency: Currency) => {
    dispatch(updateCurrency(currency));
    setIsActive(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center gap-2 px-4 py-3 bg-bkg-input/40 rounded-md"
        onClick={() => setIsActive(!isActive)}
      >
        <Image
          src={`/images/currency/${currentTheme}/usd.svg`}
          alt="Currency icon"
          width={20}
          height={20}
        />
        <div>
          <p>{currentCurrency.abbr.toUpperCase()}</p>
        </div>
        <Image
          src={`/images/navbar/${currentTheme}/chevron-down.svg`}
          alt="Chevron down icon"
          width={12}
          height={12}
        />
      </button>
      <div
        className={`bg-bkg-input/40 text-center rounded-lg absolute left-0 right-0 ${
          isActive ? "" : "hidden"
        }`}
      >
        {currencies.map((c) => (
          <button
            key={c.abbr}
            className={`text-center flex items-center gap-2 w-full py-2 px-4 ${
              currentCurrency === c ? "bg-bkg-input" : ""
            }`}
            onClick={() => handleCurrencyClick(c)}
          >
            <input
              type="radio"
              readOnly={true}
              checked={c.abbr === currentCurrency.abbr}
            />
            <p className="mx-auto">{c.abbr.toUpperCase()}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencyChanger;
