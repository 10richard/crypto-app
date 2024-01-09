import ChartInfo from "./ChartInfo";
import { Bar } from "react-chartjs-2";
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

interface VolumeChartProps {
  tokens: TokenSlide[];
  timePeriod: string;
}

const VolumeChart = ({ tokens, timePeriod }: VolumeChartProps) => {
  const activeToken = tokens.find((t: TokenSlide) => t.selected);
  const volumes = activeToken?.chartData?.total_volumes || [];
  const volume_summation = activeToken?.chartData?.volume_summation || 0;

  const volumeData = {
    labels: Array.from(Array(volumes.length).keys()),
    datasets: [
      {
        data: volumes,
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
            linearGradient.addColorStop(0, "#A75EE0");
            linearGradient.addColorStop(1, "#251d3c");
            return linearGradient;
          }
        },
      },
    ],
  };

  const volumeOpts = {
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
        title={`Volume ${timePeriod}`}
        value={volume_summation.toString()}
      />
      <div className="h-[216px]">
        <Bar data={volumeData} options={volumeOpts} />
      </div>
    </div>
  );
};

export default VolumeChart;
