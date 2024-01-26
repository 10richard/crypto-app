export async function getTop50Tokens(currency: string) {
  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d`
  );
  const json = await data.json();
  return json;
}
