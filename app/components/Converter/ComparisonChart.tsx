import { useTheme } from "@/app/contexts/themeContext";
import { purple, lightPurple } from "@/app/utils/chartColors";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import {
  CategoryScale,
  LinearScale,
  LineElement,
  ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, LineElement);

interface ComparisonChartProps {
  leftToken: string;
  rightToken: string;
  chartData: number[][];
}

const ComparisonChart = ({
  leftToken,
  rightToken,
  chartData,
}: ComparisonChartProps) => {
  const { isDarkTheme } = useTheme();

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
      gradient.addColorStop(0.5, lightPurple);
      gradient.addColorStop(1, isDarkTheme() ? "#191934" : "#fdfdff");
      return gradient;
    }
  };

  const labels = chartData.map((_, i) => i);

  const data = {
    labels,
    datasets: [
      {
        label: `${leftToken} to ${rightToken}`,
        data: chartData.map((point) => point[1]),
        fill: true,
        borderColor: purple,
        tension: 0.1,
        backgroundColor: linearGradient,
      },
    ],
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
    <div className="flex flex-col gap-6 p-6 w-full bg-chart-price rounded-lg">
      <div className="flex text-xl">
        <p>
          {leftToken} <span className="text-content-main/60 mx-4">to</span>{" "}
          {rightToken}
        </p>
      </div>
      <div className="flex flex-col max-h-[216px]">
        <Line data={data} options={pricesOpts} />
      </div>
    </div>
  );
};

export default ComparisonChart;
