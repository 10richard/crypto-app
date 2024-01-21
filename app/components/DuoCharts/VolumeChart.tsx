import ChartInfo from "./ChartInfo";
import { Bar } from "react-chartjs-2";
import { useTheme } from "@/app/contexts/themeContext";
import { Chart as ChartJS } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  LineElement,
  ChartOptions,
} from "chart.js";
import { blue, pink, purple } from "@/app/utils/chartColors";

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

interface VolumeChartProps {
  tokens: TokenSlide[];
  timePeriod: string;
}

const VolumeChart = ({ tokens, timePeriod }: VolumeChartProps) => {
  const activeTokens = tokens.filter((t: TokenSlide) => t.selected);
  const multipleTokens = activeTokens.length > 1;
  const darkTheme = useTheme().currentTheme === "dark-theme";

  const colors = multipleTokens ? [purple, pink, blue] : [pink];

  const title = multipleTokens ? "" : `Volume ${timePeriod}`;
  const value = multipleTokens
    ? `Volume ${timePeriod}`
    : `$${activeTokens[0]?.chartData?.volume_summation}` || "";

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
          gradient.addColorStop(0.6, colors[idx]);
          gradient.addColorStop(1, "transparent");
          return gradient;
        }
      };

      return {
        label: `${token.title.split(" ")[0]} $${
          token.chartData?.volume_summation
        }`,
        data: token.chartData?.total_volumes || [],
        fill: true,
        borderRadius: {
          topLeft: 6,
          topRight: 6,
        },
        borderSkipped: false,
        borderColor: colors[idx],
        backgroundColor: linearGradient,
      };
    })
    .sort((a, b) => {
      const volumeA = parseFloat(a.label.split("$")[1]) || 0;
      const volumeB = parseFloat(b.label.split("$")[1]) || 0;
      return volumeA - volumeB;
    });

  const volumeData = {
    labels: Array.from(
      Array(activeTokens[0]?.chartData?.total_volumes.length).keys()
    ),
    datasets: datasets,
  };

  const volumeOpts: ChartOptions<"bar"> = {
    plugins: {
      legend: {
        display: false,
      },
    },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        beginAtZero: true,
      },
      x: {
        grid: { display: false },
        stacked: true,
      },
    },
  };

  return (
    <div className="flex flex-col gap-6 w-[632px] bg-chart-volume rounded-xl p-6">
      <ChartInfo title={title} value={value} includeDate={true} />
      <div className="flex flex-col">
        <div className="max-h-[216px]">
          <Bar data={volumeData} options={volumeOpts} />
        </div>
        <div className={`flex gap-6 mt-11 ${multipleTokens ? "" : "hidden"}`}>
          {activeTokens.map((token, idx) => (
            <div key={token.id} className="flex gap-2 items-center">
              <span
                className={`w-5 h-5`}
                style={{ backgroundColor: colors[idx] }}
              ></span>
              <p className="text-content-sub">
                {token.title.split(" ")[0]} ${token.chartData?.volume_summation}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VolumeChart;
