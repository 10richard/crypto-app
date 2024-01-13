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

  const colors = multipleTokens
    ? ["#7878FF", "#E771FF", "#97DFFC"]
    : ["#7878FF"];
  const gradientColors = multipleTokens
    ? ["#4F4FA9", "#8251B0", "#5C889A"]
    : ["#4F4FA9"];

  const title = multipleTokens ? "" : activeTokens[0]?.title;
  const value = multipleTokens
    ? new Date().toLocaleDateString("en", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : (`$${activeTokens[0]?.current_price}` || 0).toString();

  const datasets = activeTokens.map((token, idx) => {
    const linearGradient = (context: {
      chart: { canvas: HTMLCanvasElement; height: number };
    }) => {
      const context2d = context.chart.canvas.getContext("2d");
      if (context2d) {
        const gradient = context2d.createLinearGradient(
          0,
          0,
          0,
          context.chart.height
        );
        gradient.addColorStop(0.5, gradientColors[idx]);
        gradient.addColorStop(1, "#191934");
        return gradient;
      }
    };

    return {
      label: `${token.title.split(" ")[0]} $${token.current_price}`,
      data: token.chartData?.prices || [],
      fill: true,
      showLine: true,
      borderColor: colors[idx],
      backgroundColor: linearGradient,
    };
  });

  const pricesData = {
    labels: Array.from(Array(activeTokens[0]?.chartData?.prices.length).keys()),
    type: "line",
    datasets: datasets,
  };

  const pricesOpts: ChartOptions<"line"> = {
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
    <div className="flex flex-col justify-between gap-6 w-[632px] bg-[#191934] rounded-xl p-6">
      <ChartInfo title={title} value={value} includeDate={!multipleTokens} />
      <div className="flex flex-col">
        <div className="max-h-[216px]">
          <Line data={pricesData} options={pricesOpts} />
        </div>
        <div className={`flex gap-6 mt-11 ${multipleTokens ? "" : "hidden"}`}>
          {activeTokens.map((token, idx) => (
            <div key={idx} className="flex gap-2 items-center">
              <span
                className={`w-5 h-5`}
                style={{ backgroundColor: colors[idx] }}
              ></span>
              <p className="text-[#D1D1D1]">
                {token.title.split(" ")[0]} ${token.current_price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricesChart;
