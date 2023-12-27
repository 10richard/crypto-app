export async function getBitcoinPriceVolume() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
  );
  const json = await data.json();
  return json;
}
