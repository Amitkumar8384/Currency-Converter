function ConvertButton({ onConvert, loading }) {
  return (
    <button
      type="button"
      onClick={onConvert}
      disabled={loading}
      className="w-full rounded-2xl bg-blue-600 py-4 font-bold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
    >
      {loading ? "Converting..." : "Convert Currency"}
    </button>
  );
}

export default ConvertButton;