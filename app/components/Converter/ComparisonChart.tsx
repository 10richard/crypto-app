interface ComparisonChartProps {
  leftToken: string;
  rightToken: string;
  timePeriod: string;
}

const ComparisonChart = () => {
  // Get prices for left and right token and fetch prices for each
  // Get past data for left and right token
  // Divide each price point of left by right
  // Graph the result

  // const daysMap: Record<string, string> = {
  //   "1D": "1",
  //   "7D": "7",
  //   "14D": "14",
  //   "1M": "30",
  //   "1Y": "365",
  //   "5Y": "1825",
  // };

  // const config = {
  //   vs_currency: currentCurrency.abbr,
  //   days: "1D",
  // };

  //   const datasets = activeTokens
  //     .map((token, idx) => {
  //       const linearGradient = (context: {
  //         chart: { canvas: HTMLCanvasElement; height: number };
  //       }) => {
  //         const context2d = context.chart.canvas.getContext("2d");
  //         if (context2d) {
  //           const gradient = context2d.createLinearGradient(
  //             0,
  //             0,
  //             0,
  //             context.chart.height
  //           );
  //           gradient.addColorStop(0.5, gradientColors[idx]);
  //           gradient.addColorStop(1, isDarkTheme() ? "#191934" : "#fdfdff");
  //           return gradient;
  //         }
  //       };

  //       return {
  //         label: `${token.title.split(" ")[0]} $${token.current_price}`,
  //         data: token.chartData?.prices || [],
  //         fill: true,
  //         showLine: true,
  //         borderColor: colors[idx],
  //         backgroundColor: linearGradient,
  //       };
  //     })
  //     .sort((a, b) => {
  //       const volumeA = parseFloat(a.label.split("$")[1]) || 0;
  //       const volumeB = parseFloat(b.label.split("$")[1]) || 0;
  //       return volumeA - volumeB;
  //     });

  //   const pricesData = {
  //     labels: Array.from(Array(activeTokens[0]?.chartData?.prices.length).keys()),
  //     type: "line",
  //     datasets: datasets,
  //   };

  return <div>ComparisonChart</div>;
};

export default ComparisonChart;
