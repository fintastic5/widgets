import "./Example.css";

const trendLabels = {
  positive: "Positive trend",
  negative: "Negative trend",
  neutral: "No change",
};

export function Example({
  title = "Example metric",
  value = "12,480",
  description = "Compared with the previous period",
  trend = "+12.5%",
  trendDirection = "positive",
}) {
  const trendLabel = trendLabels[trendDirection] ?? trendLabels.neutral;

  return (
    <article className="example">
      <div className="example__header">
        <p className="example__title">{title}</p>
        <span
          className={`example__trend example__trend--${trendDirection}`}
          aria-label={trendLabel}
        >
          {trend}
        </span>
      </div>

      <p className="example__value">{value}</p>
      <p className="example__description">{description}</p>
    </article>
  );
}
