import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  flex: 1;
  min-height: 0;
`;

const Title = styled.p`
  font-size: var(--font-size-heading);
  font-weight: var(--font-weight-semibold);
  color: var(--color-font-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Subtitle = styled.p`
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.05em;
  color: var(--color-font-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SvgWrap = styled.div`
  position: relative;
  width: 176px;
  height: 74px;
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
  color: var(--color-font-primary);
`;

const Footer = styled.p`
  margin: 8px 0 0;
  text-align: center;
  padding-bottom: 16px;
`;

const FooterLabel = styled.span`
  font-size: var(--font-size-body-md);
  color: var(--color-font-secondary)
`;

const FooterValue = styled.span`
  font-size: 16px;
  color: var(--color-font-primary);
  font-weight: var(--font-weight-medium);
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

/**
 * Gauge. Semicircular radial dial. Widget 4, confirmed via the Sprint 1 prototype.
 */
export function Gauge({ title, subtitle, value, target, actual, color }) {
  const pct = Math.max(0, Math.min(100, value));
  const angle = (pct / 100) * 180;

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <SvgWrap
        role="img"
        aria-label={`${title}, ${subtitle}: ${pct}% of target${target ? `, target ${target}` : ""}`}
      >
        <svg viewBox="0 0 176 96" width="176" height="96" aria-hidden="true">
          <path
            d={describeArc(88, 88, 80, 0, 180)}
            fill="none"
            stroke="var(--color-track-ring)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d={describeArc(88, 88, 80, 0, angle)}
            fill="none"
            stroke={color || "var(--color-primary, #7b5ffa)"}
            strokeWidth="16"
            strokeLinecap="round"
          />
        </svg>
        <Value aria-hidden="true">{pct}%</Value>
      </SvgWrap>
      {actual && (
        <Footer>
          <FooterLabel>Actual: </FooterLabel>
          <FooterValue>{actual}</FooterValue>
        </Footer>
      )}

      {target && (
        <Footer>
          <FooterLabel>Sales target: </FooterLabel>
          <FooterValue>{target}</FooterValue>
        </Footer>
      )}
    </Wrapper>
  );
}
