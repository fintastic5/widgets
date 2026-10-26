import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
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
  margin: ${({ $isTarget }) => ($isTarget ? "16px 0 0" : "8px 0 0")};
  text-align: center;
  font-size: var(--font-size-body-md);
  color: var(--color-font-secondary);
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

export function Gauge({ value, target, actualLabel, color }) {
  const pct = Math.max(0, Math.min(100, value));
  const angle = (pct / 100) * 180;

  return (
    <Wrapper>
      <SvgWrap
        role="img"
        aria-label={`${pct}% of target${target != null ? `, target ${target}` : ""}`}
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
      {actualLabel && (
        <Footer>
          Actual: <FooterValue>{actualLabel}</FooterValue>
        </Footer>
      )}

      {target && (
        <Footer $isTarget>
          Sales target: <FooterValue>{target}</FooterValue>
        </Footer>
      )}
    </Wrapper>
  );
}
