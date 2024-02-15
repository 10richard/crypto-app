import ChartInfo from "./ChartInfo";
import { Line } from "react-chartjs-2";
import { useTheme } from "@/app/contexts/themeContext";
import { Chart as ChartJS } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  LineElement,
  ChartOptions,
} from "chart.js";
import getTodayDate from "@/app/utils/getTodayDate";
import {
  blue,
  lightBlue,
  lightPink,
  lightPurple,
  pink,
  purple,
} from "@/app/utils/chartColors";

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
    prices: number[][];
    total_volumes: number[];
  };
}

interface PricesChartProps {
  tokens: TokenSlide[];
  currency: string;
}

const PricesChart = ({ tokens, currency }: PricesChartProps) => {
  const activeTokens = tokens.filter((t: TokenSlide) => t.selected);
  const multipleTokens = activeTokens.length > 1;
  const { isDarkTheme } = useTheme();

  const colors = multipleTokens ? [purple, pink, blue] : [purple];

  const gradientColors = multipleTokens
    ? [lightPurple, lightPink, lightBlue]
    : [lightPurple];

  const title = multipleTokens ? "" : activeTokens[0]?.title;
  const value = multipleTokens
    ? getTodayDate()
    : `${currency}${activeTokens[0]?.current_price || 0}`.toString();

  const datasets = activeTokens
    .map((token, idx) => {
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
          gradient.addColorStop(1, isDarkTheme() ? "#191934" : "#fdfdff");
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
    })
    .sort((a, b) => {
      const volumeA = parseFloat(a.label.split("$")[1]) || 0;
      const volumeB = parseFloat(b.label.split("$")[1]) || 0;
      return volumeA - volumeB;
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
    <div className="flex flex-col justify-between gap-6 w-[632px] bg-chart-price rounded-xl p-6">
      <ChartInfo title={title} value={value} includeDate={!multipleTokens} />
      <div className="flex flex-col">
        <div className="max-h-[216px]">
          <Line data={pricesData} options={pricesOpts} />
        </div>
        <div className={`flex gap-6 mt-11 ${multipleTokens ? "" : "hidden"}`}>
          {activeTokens.map((token, idx) => (
            <div key={token.id} className="flex gap-2 items-center">
              <span
                className={`w-5 h-5`}
                style={{ backgroundColor: colors[idx] }}
              ></span>
              <p className="text-content-sub">
                {token.title.split(" ")[0]} {currency}
                {token.current_price}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricesChart;
