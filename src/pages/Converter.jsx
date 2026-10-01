import { useEffect, useState } from "react";

import useCurrencyConverter from "../hooks/useCurrencyConverter";
import useCurrencies from "../hooks/useCurrencies";
import useExchangeHistory from "../hooks/useExchangeHistory";

import CurrencyInput from "../components/CurrencyInput";
import CurrencySelect from "../components/CurrencySelect";
import SwapButton from "../components/SwapButton";
import ConvertButton from "../components/ConvertButton";
import ExchangeRateChart from "../components/ExchangeRateChart";

function Converter({ onHome }) {
  const {
    currencies,
    loading: currenciesLoading,
    error: currenciesError,
  } = useCurrencies();

  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [historyRange, setHistoryRange] = useState("1M");

  const {
    rate,
    result,
    loading,
    error,
    convertCurrency,
    reset,
  } = useCurrencyConverter();

  // Historical exchange-rate data
  const {
    history,
    loading: historyLoading,
    error: historyError,
  } = useExchangeHistory(
    fromCurrency,
    toCurrency,
    historyRange
  );

  // Default currencies
  useEffect(() => {
    if (currencies.length > 0 && !fromCurrency && !toCurrency) {
      setFromCurrency("USD");
      setToCurrency("INR");
    }
  }, [currencies, fromCurrency, toCurrency]);

  // Currency symbol
  const getCurrencySymbol = (code) => {
    const currency = currencies.find(
      (item) => item.iso_code === code
    );

    return currency?.symbol || "";
  };

  // Format result
  const formattedResult =
    result !== null
      ? Number(result).toLocaleString(undefined, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })
      : "";

  // Smaller font for very large numbers
  const getAmountClass = () => {
    if (!formattedResult) return "text-5xl";

    if (formattedResult.length <= 12) {
      return "text-5xl";
    }

    if (formattedResult.length <= 17) {
      return "text-4xl";
    }

    if (formattedResult.length <= 22) {
      return "text-3xl";
    }

    return "text-2xl";
  };

  // Currency changes
  const handleFromChange = (currency) => {
    setFromCurrency(currency);
    reset();
  };

  const handleToChange = (currency) => {
    setToCurrency(currency);
    reset();
  };

  // Swap currencies
  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    reset();
  };

  // Loading currencies
  if (currenciesLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-white/10 border-t-blue-500" />

          <p className="text-sm text-slate-400">
            Loading currencies...
          </p>
        </div>
      </main>
    );
  }

  // Currency API error
  if (currenciesError) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
        <div className="w-full max-w-md rounded-3xl border border-red-400/20 bg-white/5 p-8 text-center backdrop-blur-xl">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-xl font-bold text-red-400">
            !
          </div>

          <h2 className="mt-4 text-xl font-bold text-white">
            Unable to load currencies
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {currenciesError}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 px-4 py-6 sm:py-8">
      {/* Background */}
      <div className="pointer-events-none absolute -left-40 -top-40 h-80 w-80 rounded-full bg-blue-600/15 blur-[100px]" />

      <div className="pointer-events-none absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-violet-600/15 blur-[100px]" />

      {/* Particles */}
      <span className="pointer-events-none absolute left-[12%] top-[20%] h-1 w-1 rounded-full bg-blue-400" />

      <span className="pointer-events-none absolute left-[82%] top-[25%] h-1 w-1 rounded-full bg-violet-400" />

      <span className="pointer-events-none absolute left-[20%] top-[80%] h-1 w-1 rounded-full bg-cyan-400" />

      <span className="pointer-events-none absolute left-[90%] top-[75%] h-1 w-1 rounded-full bg-blue-400" />

      {/* Navbar */}
      <nav className="relative z-10 mx-auto flex max-w-5xl items-center justify-between">
        <button
          type="button"
          onClick={onHome}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-blue-500/10 text-xl text-blue-400">
            ⇄
          </div>

          <span className="font-bold text-white">
            Currency<span className="text-blue-400">Flow</span>
          </span>
        </button>

        <button
          type="button"
          onClick={onHome}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Home
        </button>
      </nav>

      {/* Header */}
      <header className="relative z-10 mx-auto mt-10 max-w-5xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-400">
          Live Converter
        </p>

        <h1 className="mt-3 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Currency Converter
        </h1>

        <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
          Convert currencies instantly with live exchange rates.
        </p>
      </header>

      {/* Main */}
      <div className="relative z-10 mx-auto mt-8 grid max-w-5xl gap-5 lg:grid-cols-2">

        {/* Converter Card */}
        <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-2xl sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
            Convert
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Enter your amount
          </h2>

          <div className="mt-6 space-y-5">
            <CurrencyInput
              amount={amount}
              setAmount={setAmount}
            />

            <CurrencySelect
              label="From Currency"
              currencies={currencies}
              value={fromCurrency}
              setValue={handleFromChange}
            />

            <SwapButton onSwap={handleSwap} />

            <CurrencySelect
              label="To Currency"
              currencies={currencies}
              value={toCurrency}
              setValue={handleToChange}
            />

            <ConvertButton
              onConvert={() =>
                convertCurrency(
                  amount,
                  fromCurrency,
                  toCurrency
                )
              }
              loading={loading}
            />

            {error && (
              <div className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}
          </div>

          {/* Status */}
          <div className="mt-6 border-t border-white/10 pt-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">
                Live Exchange Rate
              </span>

              <span className="flex items-center gap-2 text-emerald-400">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                API Connected
              </span>
            </div>
          </div>
        </section>

        {/* Result Card */}
        <section className="flex min-w-0 flex-col rounded-3xl border border-blue-400/10 bg-gradient-to-br from-blue-500/[0.08] to-violet-500/[0.08] p-6 shadow-2xl backdrop-blur-2xl sm:p-7">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
            Result
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            Converted Amount
          </h2>

          <div className="flex min-h-[360px] flex-1 items-center justify-center">
            {/* Loading */}
            {loading && (
              <div className="text-center">
                <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-blue-400" />

                <p className="text-sm text-slate-400">
                  Converting...
                </p>
              </div>
            )}

            {/* Result */}
            {!loading && result !== null && (
              <div className="w-full text-center">
                <p className="text-sm text-slate-500">
                  {fromCurrency} → {toCurrency}
                </p>

                <div className="mt-5 flex items-center justify-center px-2">
                  <p
                    className={`${getAmountClass()} max-w-full font-black leading-tight tracking-tight text-white`}
                  >
                    {getCurrencySymbol(toCurrency)}
                    {formattedResult}
                  </p>
                </div>

                <p className="mt-3 text-lg font-bold text-blue-400">
                  {toCurrency}
                </p>

                {rate !== null && (
                  <div className="mx-auto mt-6 max-w-sm rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-xs uppercase tracking-wider text-slate-500">
                      Exchange Rate
                    </p>

                    <p className="mt-2 text-sm font-semibold text-slate-300">
                      1 {fromCurrency} ={" "}
                      {Number(rate).toFixed(6)}{" "}
                      {toCurrency}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Empty */}
            {!loading && result === null && (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl text-slate-500">
                  ⇄
                </div>

                <p className="font-semibold text-slate-300">
                  Ready to convert
                </p>

                <p className="mt-2 text-sm text-slate-500">
                  Enter an amount and click convert.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Exchange Rate History */}
      {fromCurrency && toCurrency && (
        <div className="relative z-10 mx-auto max-w-5xl">
          <ExchangeRateChart
            data={history}
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            range={historyRange}
            onRangeChange={setHistoryRange}
            loading={historyLoading}
            error={historyError}
          />
        </div>
      )}

      {/* Footer */}
      <footer className="relative z-10 mx-auto mt-8 max-w-5xl border-t border-white/10 py-5 text-center">
        <p className="text-xs text-slate-600">
          CurrencyFlow • React + Tailwind CSS
        </p>
      </footer>
    </main>
  );
}

export default Converter;