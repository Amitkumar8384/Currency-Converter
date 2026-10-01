function CurrencyInput({ amount, setAmount }) {
  const handleChange = (e) => {
    const value = e.target.value;

    // Allow empty input
    if (value === "") {
      setAmount("");
      return;
    }

    // Allow only valid positive decimal numbers
    if (!/^\d*\.?\d*$/.test(value)) {
      return;
    }

    // Maximum 15 digits excluding decimal point
    const digits = value.replace(".", "");

    if (digits.length <= 15) {
      setAmount(value);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        Amount
      </label>

      <div className="relative">
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={handleChange}
          placeholder="Enter amount"
          aria-label="Amount"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 text-lg font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
        />
      </div>
    </div>
  );
}

export default CurrencyInput;