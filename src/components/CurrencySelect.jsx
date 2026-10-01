import { useState } from "react";

function CurrencySelect({
  label,
  currencies,
  value,
  setValue,
}) {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const selectedCurrency = currencies.find(
    (currency) => currency.iso_code === value
  );

  const filteredCurrencies = currencies.filter((currency) => {
    const searchValue = search.toLowerCase();

    const code = (currency.iso_code || "").toLowerCase();
    const name = (currency.name || "").toLowerCase();

    return (
      code.includes(searchValue) ||
      name.includes(searchValue)
    );
  });

  const handleSelect = (currency) => {
    setValue(currency.iso_code);
    setSearch("");
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Label */}
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {/* Selected Currency */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-left text-sm font-semibold text-slate-800 transition-all hover:border-blue-400 hover:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="truncate">
          {selectedCurrency
            ? `${selectedCurrency.symbol || ""} ${selectedCurrency.iso_code} - ${selectedCurrency.name}`
            : "Select currency"}
        </span>

        <span className="ml-3 shrink-0 text-slate-400">
          {isOpen ? "▲" : "▼"}
        </span>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute left-0 right-0 z-50 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl">
          {/* Search */}
          <input
            type="text"
            autoFocus
            placeholder="Search currency..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            aria-label="Search currency"
          />

          {/* Currency List */}
          <div className="max-h-96 overflow-y-auto">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <button
                  key={currency.iso_code}
                  type="button"
                  onClick={() => handleSelect(currency)}
                  className={`w-full rounded-xl px-4 py-3 text-left text-sm transition-colors hover:bg-blue-50 ${
                    currency.iso_code === value
                      ? "bg-blue-50 font-semibold text-blue-700"
                      : "text-slate-700"
                  }`}
                >
                  {currency.symbol || ""} {currency.iso_code} -{" "}
                  {currency.name}
                </button>
              ))
            ) : (
              <p className="px-4 py-4 text-center text-sm text-slate-500">
                Currency not found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default CurrencySelect;