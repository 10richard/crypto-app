import ChartInfo from "./ChartInfo";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  LineElement,
  ChartOptions,
} from "chart.js";

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
  const activeTokens = tokens.filter((t: TokenSlide) => t.selected);
  const multipleTokens = activeTokens.length > 1;
  const colors = ["#A75EE0", "#E771FF", "#97DFFC"];

  const title = multipleTokens ? "" : activeTokens[0]?.title;
  const value = multipleTokens
    ? new Date().toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : (`$${activeTokens[0]?.current_price}` || 0).toString();

  const datasets = activeTokens.map((token, idx) => ({
    label: `${token.title.split(" ")[0]} $${token.current_price}`,
    data: token.chartData?.prices || [],
    fill: false,
    showLine: true,
    borderColor: colors[idx],
    backgroundColor: colors[idx],
  }));

  const pricesData = {
    labels: Array.from(Array(activeTokens[0]?.chartData?.prices.length).keys()),
    type: "line",
    datasets: datasets,
    // [
    //   {
    //     borderColor: "#5E74C9",
    //     data: prices,
    //     fill: true,
    //     backgroundColor: (context: {
    //       chart: { canvas: HTMLCanvasElement; height: number };
    //     }) => {
    //       const context2d = context.chart.canvas.getContext("2d");
    //       if (context2d) {
    //         const linearGradient = context2d.createLinearGradient(
    //           0,
    //           0,
    //           0,
    //           context.chart.height
    //         );
    //         linearGradient.addColorStop(0, "#4f4fa8");
    //         linearGradient.addColorStop(1, "#1c1c3a");
    //         return linearGradient;
    //       }
    //     },
    //   },
    // ],
  };

  const pricesOpts: ChartOptions<"line"> = {
    plugins: {
      legend: {
        display: multipleTokens,
        position: "bottom",
        labels: {
          color: "#D1D1D1",
        },
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
      <ChartInfo title={title} value={value} includeDate={!multipleTokens} />
      <div className="h-[216px]">
        <Line data={pricesData} options={pricesOpts} />
      </div>
    </div>
  );
};

export default PricesChart;
