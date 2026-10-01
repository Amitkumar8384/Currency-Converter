function SwapButton({ onSwap }) {
  return (
    <div className="flex justify-center">
      <button
        type="button"
        onClick={onSwap}
        className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-xl text-slate-600 shadow-md transition-all duration-200 hover:rotate-180 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-600 hover:shadow-lg active:scale-95"
        title="Swap currencies"
      >
        ⇅
      </button>
    </div>
  );
}

export default SwapButton;