export async function getTokenInfo(token_id: string) {
  const data = await fetch(
    `https://api.coingecko.com/api/v3/coins/${token_id}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`
  );
  const json = (await data).json();
  return json;
}
