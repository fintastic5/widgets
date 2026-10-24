import styled from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-height: 0;
  gap: 12px;
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


const RingWrap = styled.div`
  position: relative;
  width: min(100%, 144px);
  aspect-ratio: 1;
  flex: 0 0 144px;
  align-self: center;
`;

const Value = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-display-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-font-primary);
`;

export function ProgressRing({ title, subtitle, value = 0, color }) {
  const radius = 70;
  const c = ringCircumference(radius);

  return (
    <Wrapper>
      <div>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
      <RingWrap 
        role="progressbar" 
        aria-label={`${title || "Progress"} ${subtitle}: ${value}%`}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        
      >
        <svg viewBox="0 0 160 160" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
          <circle cx="80" cy="80" r={radius} fill="none" stroke="var(--color-track-ring)" strokeWidth="16" />
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color || "var(--color-primary, #7b5ffa)"}
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
