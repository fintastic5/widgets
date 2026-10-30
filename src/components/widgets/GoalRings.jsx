import React from "react";
import styled from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: 100%;
  gap: 36px;
  color: var(--color-font-primary);

  @container panel-content (max-width: 519px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const RingSection = styled.div`
  display: flex;
  flex: 0 0 140px;
  width: 140px;
  height: 140px;
  min-width: 0;
  margin-inline: auto;
`;

const ValueContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Value = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BigNumber = styled.span`
  font-size: var(--font-size-heading);
  font-weight: var(--font-weight-bold);
  color: var(--color-font-primary);
`;

const SmallLabel = styled.span`
  font-size: var(--font-size-body-sm);
  color: var(--color-font-secondary);
  font-weight: var(--font-weight-medium);
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 14px;
  flex: 1;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Key = styled.span`
  width: 12px;
  height: 12px;
  flex-shrink: 0;
  border-radius: 2px;
  background: ${(p) => p.$color};
`;

const Label = styled.span`
  flex: 1;
  font-size: var(--font-size-body-sm)
  color: var(--color-font-secondary);
`;

const Amount = styled.span`
  color: var(--color-font-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-body-md)
`;

const Badge = styled.span`
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-medium);
  padding: 2px 6px;
  border-radius: 999px;

  background: ${(p) => (p.$direction === "up" ? "var(--color-success-bg)" : p.$direction === "down" ? "var(--color-error-bg)" : "var(--color-warning-bg)")};

  color: ${(p) => (p.$direction === "up" ? "var(--color-success)" : p.$direction === "down" ? "var(--color-error)" : "var(--color-warning)")};
`;

const RING_COLORS = ["var(--color-chart-1)", "var(--color-chart-2)", "var(--color-chart-3)"];

export function GoalRings({ overall = 0, items = [] }) {
  
  const getColor = (item, i) => {
    return item.color || RING_COLORS[i % RING_COLORS.length];
  }

  const radii = [64, 48, 32];

  return (
    <Wrapper>
      <RingSection>
        <ValueContainer role="img" aria-label={`${overall}% overall`}>
          <svg 
            viewBox="0 0 140 140" 
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {items.slice(0, 3).map((item, i) => {
              const r = radii[i];
              const c = ringCircumference(r);
              return (
                <React.Fragment key={item.label}>
                  <circle cx="70" cy="70" r={r} fill="none" stroke="var(--color-track-ring)" strokeWidth="10" />
                  <circle
                    cx="70"
                    cy="70"
                    r={r}
                    fill="none"
                    stroke={getColor(item, i)}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={ringOffset(r, item.pct)}
                    transform="rotate(-90 70 70)"
                  />
                </React.Fragment>
              );
            })}
          </svg>
          <Value aria-hidden="true">
            <BigNumber>{overall}%</BigNumber>
            <SmallLabel>Overall</SmallLabel>
          </Value>
        </ValueContainer>
      </RingSection>
      <List>
        {items.map((item, i) => (
          <Row key={item.label}>
            <Key 
              $color={getColor(item, i)}
              aria-hidden="true"
            />
            <Label>{item.label}</Label>
            <Amount>{item.amount}</Amount>
            {item.change !== undefined && (
              <Badge
                $direction={item.change > 0 ? "up" : item.change < 0 ? "down" : "flat"}
              >
                {item.change > 0 ? "+" : ""}{item.change}%
              </Badge>
            )}
          </Row>
        ))}
      </List>
    </Wrapper>
  );
}
