import { styled } from "styled-components";

const Wrapper = styled.div`
  color: var(--text-secondary, #5b5b63);
`;
const Title = styled.p`
  margin: 0;
  font-size: 20px;
`;
const Subtitle = styled.p`
  margin: 0 0 14px;
  font-weight: 400;
  color: var(--text-secondary, #5b5b63);
`;
const Donut = styled.div`
  width: 114px;
  height: 114px;
  margin: 0 auto 12px;
  border-radius: 50%;
  background: conic-gradient(${(p) => p.$gradient});
  position: relative;

  &::after {
    content: "";
    position: absolute;
    inset: 36px;
    border-radius: 50%;
    background: var(--bg-widget, #ffffff);
  }
`;
const Legend = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  font-size: 15px;
`;
const LegendItem = styled.li`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const Swatch = styled.span`
  width: 13px;
  height: 13px;
  border-radius: 3px;
  background: ${(p) => p.$color};
`;

const SEGMENT_COLORS = ["#00a4ad", "#078bff", "#6254f5", "#ffae42"];

export function Distribution({ title, subtitle, segments = [] }) {
  const gradientOrder = segments.length >= 3
    ? [segments[segments.length - 1], ...segments.slice(0, -1)]
    : segments;
  const stops = gradientOrder.reduce((acc, seg) => {
    const i = segments.indexOf(seg);
    const color = SEGMENT_COLORS[i % SEGMENT_COLORS.length];
    const start = acc.cursor;
    const end = start + seg.pct;
    acc.stops.push(`${color} ${start}% ${end}%`);
    acc.cursor = end;
    return acc;
  }, { stops: [], cursor: 0 }).stops;

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <Donut $gradient={stops.join(", ")} role="img" aria-label={segments.map((s) => `${s.label} ${s.pct}%`).join(", ")} />
      <Legend>
        {segments.map((seg, i) => (
          <LegendItem key={seg.label}>
            <Swatch $color={SEGMENT_COLORS[i % SEGMENT_COLORS.length]} />
            {seg.label} {seg.pct}%
          </LegendItem>
        ))}
      </Legend>
    </Wrapper>
  );
}
