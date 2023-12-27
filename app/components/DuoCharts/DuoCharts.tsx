"use client";

import { getBitcoinPriceVolume } from "@/app/api/getBitcoinInfo";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, LinearScale, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement);

const DuoCharts = () => {
  const [prices, setPrices] = useState([]);
  const [volume, setVolume] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getBitcoinPriceVolume();
      setPrices(data.prices);
      setVolume(data.total_volumes);
    };
    fetchData();
  }, []);

  const pricesData = {
    labels: Array.from(Array(prices.length).keys()),
    datasets: [
      {
        borderColor: "#5E74C9",
        data: prices,
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

  const volumeData = {
    labels: Array.from(Array(volume.length).keys()),
    datasets: [
      {
        borderColor: "#5E74C9",
        data: volume,
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

  return (
    <div className="flex flex-col items-center mt-[72px]">
      <div className="flex gap-8 max-w-[1296px]">
        <div className="w-[632px] h-[404px] bg-[#191934] rounded-xl p-6">
          <Line data={pricesData} />
        </div>
        <div className="w-[632px] h-[404px] bg-[#1F1934] rounded-xl p-6">
          <Line data={volumeData} />
        </div>
      </div>
    </div>
  );
};

export default DuoCharts;
