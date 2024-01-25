import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useCurrency } from "@/app/contexts/currencyContext";

interface CurrencyChangerProps {
  currentTheme: string;
}

const CurrencyChanger = ({ currentTheme }: CurrencyChangerProps) => {
  const [isActive, setIsActive] = useState(false);
  const { currentCurrency, setCurrentCurrency } = useCurrency();
  const currencies = ["usd", "gbp", "eur", "btc", "eth"];
  const dropDownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(event.target as Node)
      ) {
        setIsActive(false);
      }
    }

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropDownRef]);

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
          <p>{currentCurrency.toUpperCase()}</p>
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
        ref={dropDownRef}
      >
        {currencies.map((c) => (
          <button
            key={c}
            className={`text-center flex items-center gap-2 w-full py-2 px-4 ${
              currentCurrency === c ? "bg-bkg-input" : ""
            }`}
            onClick={() => setCurrentCurrency(c)}
          >
            <input type="radio" checked={c === currentCurrency} />
            <p className="mx-auto">{c.toUpperCase()}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CurrencyChanger;
