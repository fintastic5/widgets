import { styled } from "styled-components";

const Wrapper = styled.div`
  color: var(--text-secondary, #c1c4e5);
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Subtitle = styled.p`
  margin: 0 0 12px;
  font-weight: 600;
  color: var(--text-primary, #f9f9fa);
`;

const SvgWrap = styled.div`
  position: relative;
  width: 160px;
  height: 90px;
  margin: 0 auto;
`;

const Value = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary, #f9f9fa);
`;

const Footer = styled.p`
  margin: 8px 0 0;
  font-size: 13px;
  text-align: center;
`;

function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(angleInRadians),
    y: cy + r * Math.sin(angleInRadians),
  };
}

export function Gauge({ title, subtitle, value, target, actualLabel }) {
  const pct = Math.max(0, Math.min(100, value));
  const angle = (pct / 100) * 180;

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <SvgWrap role="img" aria-label={`${title || "Gauge"}: ${pct}% of target${target ? `, target ${target}` : ""}`}>
        <svg viewBox="0 0 160 90" width="160" height="90">
          <path d={describeArc(80, 80, 70, 0, 180)} fill="none" stroke="var(--border, #343875)" strokeWidth="14" strokeLinecap="round" />
          <path d={describeArc(80, 80, 70, 0, angle)} fill="none" stroke="var(--purple-400, #7b5ffa)" strokeWidth="14" strokeLinecap="round" />
        </svg>
        <Value>{pct}%</Value>
      </SvgWrap>
      {actualLabel && <Footer>{actualLabel}</Footer>}
      {target && <Footer>Sales target: {target}</Footer>}
    </Wrapper>
  );
}
