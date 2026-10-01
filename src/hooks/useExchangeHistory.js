import { useEffect, useState } from "react";
import { getTimeSeries } from "../services/currencyApi";

const RANGE_CONFIG = {
  "1W": {
    days: 7,
    group: null,
  },

  "1M": {
    days: 30,
    group: null,
  },

  "3M": {
    days: 90,
    group: "week",
  },

  "6M": {
    days: 180,
    group: "week",
  },

  "1Y": {
    days: 365,
    group: "month",
  },

  "5Y": {
    days: 1825,
    group: "month",
  },
};

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

function getStartDate(days) {
  const date = new Date();

  date.setDate(date.getDate() - days);

  return formatDate(date);
}

function useExchangeHistory(
  fromCurrency,
  toCurrency,
  range = "1M"
) {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!fromCurrency || !toCurrency) {
      setHistory([]);
      return;
    }

    if (fromCurrency === toCurrency) {
      setHistory([]);
      setError("");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function loadHistory() {
      try {
        setLoading(true);
        setError("");

        const config =
          RANGE_CONFIG[range] || RANGE_CONFIG["1M"];

        const from = getStartDate(config.days);
        const to = formatDate(new Date());

        const data = await getTimeSeries(
          fromCurrency,
          toCurrency,
          from,
          to,
          config.group
        );

        if (controller.signal.aborted) {
          return;
        }

        const formattedData = Array.isArray(data)
          ? data
              .filter(
                (item) =>
                  item &&
                  item.date &&
                  typeof item.rate === "number"
              )
              .map((item) => ({
                date: item.date,
                rate: item.rate,
              }))
          : [];

        setHistory(formattedData);
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        console.error(
          "Exchange history error:",
          error
        );

        setHistory([]);
        setError(
          "Unable to load exchange-rate history"
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadHistory();

    return () => {
      controller.abort();
    };
  }, [fromCurrency, toCurrency, range]);

  return {
    history,
    loading,
    error,
  };
}

export default useExchangeHistory;