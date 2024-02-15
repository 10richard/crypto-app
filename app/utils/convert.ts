export default function convert(
  sellAmt: number,
  leftPrice: number,
  rightPrice: number
) {
  const leftTotal = sellAmt * leftPrice;
  const rightTotal = leftTotal / rightPrice;

  return rightTotal;
}
