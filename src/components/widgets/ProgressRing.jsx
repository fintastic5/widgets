import { styled } from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

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

const RingWrap = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  margin: 0 auto;
`;

const Value = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
  color: var(--text-primary, #f9f9fa);
`;

export function ProgressRing({ title, subtitle, value = 0 }) {
  const radius = 70;
  const c = ringCircumference(radius);

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <RingWrap role="img" aria-label={`${title || "Progress"}: ${value}%`}>
        <svg viewBox="0 0 160 160" width="160" height="160">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border, #343875)" strokeWidth="14" />
          <circle
            cx="80" cy="80" r={radius} fill="none" stroke="var(--purple-400, #7b5ffa)"
            strokeWidth="14" strokeLinecap="round" strokeDasharray={c}
            strokeDashoffset={ringOffset(radius, value)} transform="rotate(-90 80 80)"
          />
        </svg>
        <Value>{value}%</Value>
      </RingWrap>
    </Wrapper>
  );
}
