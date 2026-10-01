import { useState } from "react";
import { getExchangeRate } from "../services/currencyApi";

function useCurrencyConverter() {
  const [rate, setRate] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const convertCurrency = async (
    amount,
    fromCurrency,
    toCurrency
  ) => {
    // Check amount
    if (!amount) {
      setError("Please enter an amount");
      setResult(null);
      return;
    }

    // Check positive amount
    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      setResult(null);
      return;
    }

    // Check currencies
    if (!fromCurrency || !toCurrency) {
      setError("Please select currencies");
      setResult(null);
      return;
    }

    // Same currency
    if (fromCurrency === toCurrency) {
      setRate(1);
      setResult(Number(amount));
      setError("");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Get exchange rate from API
      const data = await getExchangeRate(
        fromCurrency,
        toCurrency
      );

      setRate(data.rate);

      // Calculate converted amount
      const convertedAmount =
        Number(amount) * data.rate;

      setResult(convertedAmount);
    } catch (error) {
      console.error("Conversion error:", error);

      setError("Unable to fetch exchange rate");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  // Reset conversion
  const reset = () => {
    setRate(null);
    setResult(null);
    setError("");
  };

  return {
    rate,
    result,
    loading,
    error,
    convertCurrency,
    reset,
  };
}

export default useCurrencyConverter;