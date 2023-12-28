import ChartInfo from "./ChartInfo";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, LinearScale, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement);

interface PricesChartProps {
  currPrice: string;
  prices: number[];
}

const PricesChart = ({ currPrice, prices }: PricesChartProps) => {
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

  return (
    <div className="flex flex-col gap-6 w-[632px] bg-[#191934] rounded-xl p-6">
      <ChartInfo value={currPrice} />
      <div className="h-[216px]">
        <Line data={pricesData} options={pricesOpts} />
      </div>
    </div>
  );
};

export default PricesChart;
