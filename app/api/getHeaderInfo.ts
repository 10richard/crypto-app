export async function getHeaderInfo() {
  const data = await fetch("https://api.coingecko.com/api/v3/global");
  const json = await data.json();
  return json.data;
}
