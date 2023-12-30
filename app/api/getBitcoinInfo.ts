export async function getPast5Years() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1825&interval=daily"
  );
  const json = await data.json();
  return json;
}

export async function getPastYear() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365&interval=daily"
  );
  const json = await data.json();
  return json;
}

export async function getPastMonth() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily"
  );
  const json = await data.json();
  return json;
}

export async function getPast14Days() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=14&interval=daily"
  );
  const json = await data.json();
  return json;
}

export async function getPast7Days() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=daily"
  );
  const json = await data.json();
  return json;
}

export async function getPast24Hours() {
  const data = await fetch(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=1"
  );
  const json = await data.json();
  return json;
}
