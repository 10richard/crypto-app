export default function getDataFrequency(
  data: Array<[number, number]> | number[][],
  timePeriod: string
) {
  if (timePeriod === "1D") {
    return data.filter((data, idx) => {
      return idx % 12 === 0;
    });
  } else if (timePeriod === "1Y" || timePeriod === "5Y") {
    return data.filter((data, idx) => {
      return idx % 30 === 0;
    });
  } else {
    return data;
  }
}
