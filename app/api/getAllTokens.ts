export async function getAllTokens() {
  const data = await fetch("https://api.coingecko.com/api/v3/coins/list");
  const json = await data.json();
  return json;
}
