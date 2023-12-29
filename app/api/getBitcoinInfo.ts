export async function getPast30Days() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
  );
  const json = await data.json();
  return json;
}
