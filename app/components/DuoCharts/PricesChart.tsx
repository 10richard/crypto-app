import ChartInfo from "./ChartInfo";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import { CategoryScale, LinearScale, LineElement } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement);

interface TokenSlide {
  id: string;
  title: string;
  image: string;
  current_price: number;
  price_change1h: number;
  selected: boolean;
  chartData?: {
    volume_summation?: string;
    prices: Array<[number, number]>;
    total_volumes: number[];
  };
}

interface PricesChartProps {
  tokens: TokenSlide[];
}

const PricesChart = ({ tokens }: PricesChartProps) => {
  const activeToken = tokens.find((t: TokenSlide) => t.selected);
  const prices = activeToken?.chartData?.prices || [];
  const current_price = activeToken?.current_price || 0;

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
    animation: {
      duration: 0,
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
      <ChartInfo
        title={activeToken?.title || ""}
        value={current_price.toString()}
      />
      <div className="h-[216px]">
        <Line data={pricesData} options={pricesOpts} />
      </div>
    </div>
  );
};

export default PricesChart;
