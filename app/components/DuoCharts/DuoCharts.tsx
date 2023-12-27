"use client";

import { getPast30Days } from "@/app/api/getBitcoinInfo";
import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, LinearScale, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement);

const DuoCharts = () => {
  const [prices, setPrices] = useState([]);
  const [volume, setVolume] = useState([]);

  const currDate = new Date();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getPast30Days();
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
            linearGradient.addColorStop(0, "#4f4fa8");
            linearGradient.addColorStop(1, "#1c1c3a");
            return linearGradient;
          }
        },
      },
    ],
  };

  const pricesOpts = {
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
      line: {
        tension: 0.4,
      },
    },
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: { display: false },
      },
    },
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
        <div className="flex flex-col gap-6 w-[632px] bg-[#191934] rounded-xl p-6">
          <div className="flex flex-col gap-4">
            <p className="text-xl text-[#D1D1D1]">Bitcoin (BTC)</p>
            <p className="text-[28px] font-bold">$13.431 mln</p>
            <p className="text-[#D1D1D1]">
              {currDate.toLocaleDateString("en", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
          <div className="h-[216px]">
            <Line data={pricesData} options={pricesOpts} />
          </div>
        </div>
        <div className="w-[632px] bg-[#1F1934] rounded-xl p-6">
          <Line data={volumeData} options={pricesOpts} />
        </div>
      </div>
    </div>
  );
};

export default DuoCharts;
