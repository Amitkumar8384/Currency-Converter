import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString(
    undefined,
    {
      month: "short",
      day: "numeric",
    }
  );
}

function ExchangeRateChart({
  data,
  fromCurrency,
  toCurrency,
  range,
  onRangeChange,
  loading,
  error,
}) {
  const ranges = ["1W", "1M", "3M", "6M", "1Y", "5Y"];

  return (
    <section className="mt-5 rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl backdrop-blur-2xl sm:p-7">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-400">
            Exchange History
          </p>

          <h2 className="mt-2 text-2xl font-bold text-white">
            {fromCurrency} → {toCurrency}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Historical exchange rate
          </p>
        </div>

        {/* Range buttons */}
        <div className="flex flex-wrap gap-2">
          {ranges.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRangeChange(item)}
              className={`rounded-xl px-3 py-2 text-xs font-semibold transition ${
                range === item
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="mt-6 h-[320px] w-full">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <div className="mx-auto mb-4 h-9 w-9 animate-spin rounded-full border-4 border-white/10 border-t-blue-400" />

              <p className="text-sm text-slate-500">
                Loading chart...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="font-semibold text-red-400">
                Unable to load chart
              </p>

              <p className="mt-2 text-sm text-slate-500">
                {error}
              </p>
            </div>
          </div>
        ) : data.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center">
              <p className="font-semibold text-slate-300">
                No historical data
              </p>

              <p className="mt-2 text-sm text-slate-500">
                Historical rates are not available for
                this currency pair.
              </p>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.08)"
              />

              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                minTickGap={28}
              />

              <YAxis
                tick={{
                  fill: "#64748b",
                  fontSize: 11,
                }}
                axisLine={false}
                tickLine={false}
                width={65}
                tickFormatter={(value) =>
                  Number(value).toFixed(2)
                }
                domain={["auto", "auto"]}
              />

              <Tooltip
                contentStyle={{
                  background: "#0f172a",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
                labelFormatter={formatDate}
                formatter={(value) => [
                  Number(value).toFixed(6),
                  `${toCurrency} rate`,
                ]}
              />

              <Line
                type="monotone"
                dataKey="rate"
                stroke="#60a5fa"
                strokeWidth={2.5}
                dot={false}
                activeDot={{
                  r: 5,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Footer */}
      {!loading && !error && data.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-4 text-xs text-slate-500">
          <span>
            1 {fromCurrency} = {toCurrency}
          </span>

          <span>
            {data.length} data points
          </span>
        </div>
      )}
    </section>
  );
}

export default ExchangeRateChart;