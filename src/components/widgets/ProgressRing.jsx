import styled from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
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

export function ProgressRing({ value = 0, color }) {
  const radius = 70;
  const c = ringCircumference(radius);

  return (
    <Wrapper>
      <RingWrap 
        role="progressbar" 
        aria-label={`"Progress": ${value}%`}
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
