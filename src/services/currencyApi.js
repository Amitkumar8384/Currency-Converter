const API_URL = "https://api.frankfurter.dev/v2";

// Get all currencies
export async function getCurrencies() {
  const response = await fetch(`${API_URL}/currencies`);

  if (!response.ok) {
    throw new Error("Failed to fetch currencies");
  }

  return response.json();
}

// Get single currency pair rate
export async function getExchangeRate(from, to) {
  const response = await fetch(
    `${API_URL}/rate/${from}/${to}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error.message || "Failed to fetch exchange rate"
    );
  }

  return response.json();
}

// Convert amount
export async function convertCurrency(amount, from, to) {
  if (from === to) {
    return {
      amount,
      rate: 1,
      result: amount,
      base: from,
      quote: to,
    };
  }

  const data = await getExchangeRate(from, to);

  return {
    amount,
    rate: data.rate,
    result: amount * data.rate,
    date: data.date,
    base: data.base,
    quote: data.quote,
  };
}

// Get latest rates for multiple currencies
export async function getRates(base = "EUR", quotes = []) {
  const params = new URLSearchParams();

  params.set("base", base);

  if (quotes.length > 0) {
    params.set("quotes", quotes.join(","));
  }

  const response = await fetch(
    `${API_URL}/rates?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch rates");
  }

  return response.json();
}

// Get historical rate
export async function getHistoricalRate(
  date,
  base,
  quotes = []
) {
  const params = new URLSearchParams();

  params.set("date", date);
  params.set("base", base);

  if (quotes.length > 0) {
    params.set("quotes", quotes.join(","));
  }

  const response = await fetch(
    `${API_URL}/rates?${params.toString()}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch historical rate");
  }

  return response.json();
}

// Get exchange-rate history
export async function getTimeSeries(
  base,
  quote,
  from,
  to,
  group
) {
  const params = new URLSearchParams();

  params.set("base", base);
  params.set("quotes", quote);
  params.set("from", from);

  if (to) {
    params.set("to", to);
  }

  if (group) {
    params.set("group", group);
  }

  const response = await fetch(
    `${API_URL}/rates?${params.toString()}`
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(
      error.message || "Failed to fetch exchange-rate history"
    );
  }

  return response.json();
}