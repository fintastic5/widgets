import { styled } from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

const Wrapper = styled.div`
  color: var(--text-secondary, #5b5b63);
`;

const Title = styled.p`
  margin: 0;
  font-size: 20px;
`;

const Subtitle = styled.p`
  margin: 0 0 12px;
  font-weight: 400;
  color: var(--text-secondary, #5b5b63);
`;

const RingWrap = styled.div`
  position: relative;
  width: 168px;
  height: 168px;
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
  color: var(--text-primary, #111111);
`;

export function ProgressRing({ title, subtitle, value = 0 }) {
  const radius = 70;
  const c = ringCircumference(radius);

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <RingWrap role="img" aria-label={`${title || "Progress"}: ${value}%`}>
        <svg viewBox="0 0 160 160" width="168" height="168">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border, #eeeeef)" strokeWidth="16" />
          <circle
            cx="80" cy="80" r={radius} fill="none" stroke="var(--purple-400, #6254f5)"
            strokeWidth="16" strokeLinecap="round" strokeDasharray={c}
            strokeDashoffset={ringOffset(radius, value)} transform="rotate(-90 80 80)"
          />
        </svg>
        <Value>{value}%</Value>
      </RingWrap>
    </Wrapper>
  );
}
