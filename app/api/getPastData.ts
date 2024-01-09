export async function getPastData(coin: string, query: string) {
  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?${query}`
  );
  const json = await data.json();
  return json;
}
