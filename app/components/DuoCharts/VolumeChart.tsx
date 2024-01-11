import ChartInfo from "./ChartInfo";
import { Bar } from "react-chartjs-2";
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

interface VolumeChartProps {
  tokens: TokenSlide[];
  timePeriod: string;
}

const VolumeChart = ({ tokens, timePeriod }: VolumeChartProps) => {
  const activeTokens = tokens.filter((t: TokenSlide) => t.selected).sort();
  const multipleTokens = activeTokens.length > 1;
  const colors = ["#A75EE0", "#E771FF", "#97DFFC"];

  const datasets = activeTokens.map((token, idx) => ({
    label: `${token.title.split(" ")[0]} $${token.chartData?.volume_summation}`,
    data: token.chartData?.total_volumes,
    fill: true,
    backgroundColor: colors[idx],
  }));

  // const volumes = multipleTokens
  //   ? activeTokens.map((t) => t.chartData?.total_volumes)
  //   : activeTokens[0]?.chartData?.total_volumes || [];

  // const volume_summation = multipleTokens
  //   ? null
  //   : activeTokens[0]?.chartData?.volume_summation || 0;

  const volumeData = {
    labels: Array.from(
      Array(activeTokens[0]?.chartData?.total_volumes.length).keys()
    ),
    datasets: datasets,
    // [
    //   {
    //     label: `${activeTokens[0]?.title.split(" ")[0]} $${
    //       activeTokens[0]?.chartData?.volume_summation
    //     }`,
    //     data: volumes,
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
    //         linearGradient.addColorStop(0, "#A75EE0");
    //         linearGradient.addColorStop(1, "#251d3c");
    //         return linearGradient;
    //       }
    //     },
    //   },
    // ],
  };

  const volumeOpts: ChartOptions<"bar"> = {
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
        stacked: true,
        beginAtZero: true,
      },
      x: {
        grid: { display: false },
        stacked: true,
      },
    },
  };

  return (
    <div className="flex flex-col gap-6 w-[632px] bg-[#191934] rounded-xl p-6">
      <ChartInfo
        title={multipleTokens ? "" : `Volume ${timePeriod}`}
        value={
          multipleTokens
            ? `Volume ${timePeriod}`
            : activeTokens[0]?.chartData?.volume_summation || ""
        }
      />
      <div className="h-[216px]">
        <Bar data={volumeData} options={volumeOpts} />
      </div>
    </div>
  );
};

export default VolumeChart;
