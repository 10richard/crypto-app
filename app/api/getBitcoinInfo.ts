export async function getPastData(query: string) {
  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?${query}`
  );
  const json = await data.json();
  return json;
}
