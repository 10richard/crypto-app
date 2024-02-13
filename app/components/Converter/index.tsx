"use client";

import getTodayDateTime from "@/app/utils/getTodayDateTime";
import TimePeriodSelector from "../DuoCharts/TimePeriodSelector";
import { MaxWidthContainer } from "../styled/MaxWidthContainer";
import TokenContainer from "./TokenContainer";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/app/contexts/themeContext";
import { useCurrency } from "@/app/contexts/currencyContext";
import { getTopTokens } from "@/app/api/getTopTokens";
import convert from "@/app/utils/convert";
import { getPastData } from "@/app/api/getPastData";
import ComparisonChart from "./ComparisonChart";

interface Token {
  id: string;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
}

const Converter = () => {
  const [sellToken, setSellToken] = useState<Token>();
  const [buyToken, setBuyToken] = useState<Token>();
  const [sellTokenValue, setSellTokenValue] = useState("1");
  const [buyTokenValue, setBuyTokenValue] = useState("1");
  const [topTokens, setTopTokens] = useState<Token[]>();
  const [timePeriod, setTimePeriod] = useState("1D");
  const [chartData, setChartData] = useState<number[][]>([]);
  const prevSellToken = useRef<Token>();
  const prevBuyToken = useRef<Token>();
  const { currentTheme } = useTheme();
  const { currentCurrency } = useCurrency();

  const daysMap: Record<string, string> = {
    "1D": "1",
    "7D": "7",
    "14D": "14",
    "1M": "30",
    "1Y": "365",
    "5Y": "1825",
  };

  const config = {
    vs_currency: currentCurrency.abbr,
    days: "1D",
  };

  const getQueryString = () => {
    config.days = daysMap[timePeriod];
    config.vs_currency = currentCurrency.abbr;
    let query = Object.entries(config).reduce(
      (acc, [key, val]) => `${acc}&${key}=${val}`,
      ""
    );

    query += timePeriod === "1D" ? "" : "&interval=daily";
    return query;
  };

  const mergePastPricesData = (
    sellTokenPrices: Array<[number, number]>,
    buyTokenPrices: Array<[number, number]>
  ) => {
    const mergedData = sellTokenPrices.map((pricePoint, i) => {
      return [pricePoint[1] / buyTokenPrices[i][1], pricePoint[0]];
    });

    return mergedData;
  };

  const handleValueChange = (value: string, type: string) => {
    if (!sellToken || !buyToken || parseInt(value) < 0) return;

    if (type === "sell") {
      setSellTokenValue(value);
      const newBuyValue = convert(
        parseInt(value),
        sellToken?.current_price,
        buyToken?.current_price
      );
      setBuyTokenValue(newBuyValue.toFixed(5));
    } else if (type === "buy") {
      setBuyTokenValue(value);
      const newSellValue = convert(
        parseInt(value),
        buyToken?.current_price,
        sellToken?.current_price
      );
      setSellTokenValue(newSellValue.toFixed(5));
    }
  };

  const switchCoins = () => {
    if (!sellToken || !buyToken) return;

    const sellTokenCopy = sellToken;
    setSellToken(buyToken);
    setSellTokenValue("1");
    setBuyToken(sellTokenCopy);
    setBuyTokenValue(
      convert(1, buyToken.current_price, sellToken.current_price).toFixed(5)
    );
    prevSellToken.current = sellToken;
    prevBuyToken.current = buyToken;
  };

  useEffect(() => {
    const fetchTopTokens = async () => {
      try {
        const tokens = await getTopTokens(currentCurrency.abbr);
        if (tokens) {
          const formatTokens = tokens.map((token: Token) => ({
            id: token.id,
            image: token.image,
            symbol: token.symbol,
            name: `${token.name} (${token.symbol.toUpperCase()})`,
            current_price: token.current_price,
          }));
          const conversion = convert(
            1,
            formatTokens[0].current_price,
            formatTokens[1].current_price
          );

          setTopTokens(formatTokens);
          setSellToken(formatTokens[0]);
          setBuyToken(formatTokens[1]);
          setBuyTokenValue(conversion.toFixed());

          prevSellToken.current = sellToken;
          prevBuyToken.current = buyToken;
        } else {
          console.error("No tokens were returned from getTopTokens.");
          setTopTokens([]);
        }
      } catch (error) {
        console.error("Failed to fetch tokens:", error);
      }
    };

    fetchTopTokens();
  }, [currentCurrency]);

  useEffect(() => {
    const fetchPastData = async () => {
      if (!sellToken || !buyToken) return;
      const sellTokenData =
        prevSellToken.current !== sellToken
          ? await getPastData(sellToken?.id, getQueryString())
          : sellToken;
      const buyTokenData =
        prevBuyToken.current !== buyToken
          ? await getPastData(buyToken?.id, getQueryString())
          : buyToken;
      try {
        if (sellTokenData || buyTokenData) {
          const mergedData = mergePastPricesData(
            sellTokenData.prices,
            buyTokenData.prices
          );
          setChartData(mergedData);
        } else {
          console.error("No data was returned from getPastData.");
        }
      } catch (error) {
        console.error("Failed to fetch past data", error);
      }
    };

    fetchPastData();
  }, [sellToken, buyToken]);

  return (
    <MaxWidthContainer className="pt-11 pb-[70px]">
      <div className="mb-6">
        <h2 className="text-xl">Online currency convertor</h2>
        <p className="text-[#9E9E9E]">{getTodayDateTime()}</p>
      </div>
      <div>
        <div className="flex gap-6 w-full relative">
          <TokenContainer
            token={sellToken}
            bgColor="bg-[#191934]"
            changeToken={setSellToken}
            tokenValue={sellTokenValue}
            handleValueChange={handleValueChange}
            type="sell"
            topTokens={topTokens ?? []}
          />
          <TokenContainer
            token={buyToken}
            bgColor="bg-[#1f1934]"
            changeToken={setBuyToken}
            tokenValue={buyTokenValue}
            handleValueChange={handleValueChange}
            type="buy"
            topTokens={topTokens ?? []}
          />
          <button
            className="bg-content-main p-3 w-[48px] h-[48px] absolute right-0 left-0 mx-auto top-1/2 -translate-y-1/2 rounded-full"
            onClick={switchCoins}
          >
            <Image
              src={`/images/converter/${currentTheme}/converter-icon.svg`}
              alt="Converter icon"
              width={24}
              height={24}
            ></Image>
          </button>
        </div>
        <div className="flex flex-col w-full">
          <ComparisonChart
            leftToken={sellToken?.symbol ?? "N/a"}
            rightToken={buyToken?.symbol ?? "N/a"}
            chartData={chartData}
          />
          <TimePeriodSelector
            currTimePeriod={timePeriod}
            handleClick={setTimePeriod}
          />
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default Converter;
