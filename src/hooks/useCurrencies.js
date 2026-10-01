import { useEffect, useState } from "react";
import { getCurrencies } from "../services/currencyApi";

function useCurrencies() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCurrencies() {
      try {
        setLoading(true);
        setError("");

        const data = await getCurrencies();

        setCurrencies(
          Array.isArray(data) ? data : []
        );
      } catch (error) {
        setError("Unable to load currencies");
      } finally {
        setLoading(false);
      }
    }

    loadCurrencies();
  }, []);

  return {
    currencies,
    loading,
    error,
  };
}

export default useCurrencies;