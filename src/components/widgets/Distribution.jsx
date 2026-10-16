import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const DonutArea = styled.div`
  height: 100%;
  aspect-ratio: 1;
  margin-bottom: 16px;
`;

const Donut = styled.div`
  width: 100%;
  aspect-ratio: 1;
  border-radius: 50%;
  background: conic-gradient(${(p) => p.$gradient});
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 26px;
    border-radius: 50%;
    background: var(--color-bg-widget);
  }
`;

const Legend = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
  font-size: var(--font-size-body-sm)
`;

const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Key = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${(p) => p.$color};
  aspect-ratio: 1;
`;

const SEGMENT_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)", "var(--color-chart-4)", "var(--color-chart-5)"];

export function Distribution({ segments = [] }) {
  const stops = segments.reduce((acc, seg, i) => {
    const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
    const start = acc.cursor;
    const end = start + seg.pct;
    acc.stops.push(`${color} ${start}% ${end}%`);
    acc.cursor = end;
    return acc;
  }, { stops: [], cursor: 0 }).stops;

  return (
    <Wrapper>
      <DonutArea>
        <Donut
        $gradient={stops.join(", ")}
        role="img"
        aria-label={segments.map((s) => `${s.label} ${s.pct}%`).join(", ")}
      />
      </DonutArea>
      <Legend>
        {segments.map((seg, i) => (
          <LegendItem key={seg.label}>
            <Key 
              $color={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} 
              aria-hidden="true"
            />
            {seg.label} {seg.pct}%
          </LegendItem>
        ))}
      </Legend>
    </Wrapper>
  );
}
