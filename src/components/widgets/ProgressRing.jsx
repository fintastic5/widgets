import styled from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

const Wrapper = styled.div`
  color: var(--text-secondary);
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Subtitle = styled.p`
  margin: 0 0 12px;
  font-weight: 600;
  color: var(--text-primary);
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
  font-size: var(--font-size-display-lg);
  font-weight: 700;
  color: var(--text-primary);
`;

export function ProgressRing({ title, subtitle, value = 0 }) {
  const radius = 70;
  const c = ringCircumference(radius);

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <RingWrap 
        role="progressbar" 
        aria-label={`${title} ${subtitle}: ${value}%`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
      >
        <svg viewBox="0 0 160 160" width="160" height="160" aria-hidden="true">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--border)" strokeWidth="16" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={c}
            strokeDashoffset= {ringOffset(radius, value)}
            transform="rotate(-90 80 80)"
          />
        </svg>
        <Value aria-hidden="true">{value}%</Value>
      </RingWrap>
    </Wrapper>
  );
}
