import Link from "next/link";
import React from "react";
import PriceChangeContainer from "./PriceChangeContainer";
import roundToTenth from "@/app/utils/roundToTenth";
import formatNum from "@/app/utils/formatNum";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, LinearScale, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement);

interface TableRowProps {
  token: TokenInfo;
}

interface TokenInfo {
  id: string;
  market_cap_rank: number;
  image: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
  sparkline_in_7d: Sparkline;
}

interface Sparkline {
  price: number[];
}

const TableRow = ({ token }: TableRowProps) => {
  const tokenRank = token.market_cap_rank;
  const tokenImage = token.image;
  const tokenName = token.name;
  const tokenSymbol = token.symbol.toUpperCase();
  const currentPrice = roundToTenth(token.current_price).toLocaleString(
    "en-US"
  );
  const priceChange1h = roundToTenth(
    token.price_change_percentage_1h_in_currency
  );
  const priceChange24h = roundToTenth(
    token.price_change_percentage_24h_in_currency
  );
  const priceChange7d = roundToTenth(
    token.price_change_percentage_7d_in_currency
  );
  const volumeTurnover = (token.total_volume / token.market_cap) * 100;
  const circulatingSupplyRatio =
    (token.circulating_supply / token.total_supply) * 100;

  const everyFourthPrice = token.sparkline_in_7d.price.filter((p, idx) => {
    return idx % 4 === 0;
  });

  const sparklineData = {
    labels: Array.from(Array(everyFourthPrice.length).keys()),
    datasets: [
      {
        borderColor: "#5E74C9",
        data: everyFourthPrice,
        fill: true,
        backgroundColor: (context: {
          chart: { canvas: HTMLCanvasElement; height: number };
        }) => {
          const context2d = context.chart.canvas.getContext("2d");
          if (context2d) {
            const linearGradient = context2d.createLinearGradient(
              0,
              0,
              0,
              context.chart.height
            );
            linearGradient.addColorStop(0, "#4d5c9e");
            linearGradient.addColorStop(1, "#191926");
            return linearGradient;
          }
        },
      },
    ],
  };

  const sparklineOpts = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        radius: 0,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        display: false,
      },
    },
  };

  return (
    <div className="flex items-center justify-between my-2 gap-5 p-5 bg-tokenrow text-content-main rounded-xl">
      <div className="text-content-sub w-4">{tokenRank}</div>
      <Link href={`/token-info/${token.id}`}>
        <div className="flex items-center gap-4 w-[208px]">
          <img
            src={tokenImage}
            alt={`Image of ${tokenName}`}
            className="w-[32px]"
          />
          <div className="flex flex-wrap gap-1">
            <p>{tokenName}</p>
            <p>({tokenSymbol})</p>
          </div>
        </div>
      </Link>
      <div className="w-20">${currentPrice}</div>
      <PriceChangeContainer priceChange={priceChange1h} />
      <PriceChangeContainer priceChange={priceChange24h} />
      <PriceChangeContainer priceChange={priceChange7d} />
      <div className="flex flex-col gap-1 w-[228px]">
        <div className="text-xs flex justify-between">
          <p className="text-[#5E74C9]">${formatNum(token.total_volume)}</p>
          <p>${formatNum(token.market_cap)}</p>
        </div>
        <div className="h-[6px] w-full bg-[#3C4777] rounded-xl overflow-hidden">
          <div
            className={`h-full bg-[#5E74C9]`}
            style={{ width: `${volumeTurnover}%` }}
          ></div>
        </div>
      </div>
      <div className="text-xs flex flex-col gap-1 w-[228px]">
        <div className="flex justify-between">
          <p className="text-[#5E74C9]">
            ${formatNum(token.circulating_supply)}
          </p>
          <p>${formatNum(token.total_supply)}</p>
        </div>
        <div className="h-[6px] w-full bg-[#3C4777] rounded-xl overflow-hidden">
          <div
            className={`h-full bg-[#5E74C9]`}
            style={{ width: `${circulatingSupplyRatio}%` }}
          ></div>
        </div>
      </div>
      <div className="w-[120px] h-[45px]">
        <Line data={sparklineData} options={sparklineOpts} />
      </div>
    </div>
  );
};

export default TableRow;
