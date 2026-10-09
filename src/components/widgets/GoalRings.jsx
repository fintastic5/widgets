import React from "react";
import styled from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 36px;
  color: var(--text-secondary);
  min-width: 0;
  width: 100%;
  flex: 1;
  min-width: 0;
  min-height: 0;
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Subtitle = styled.p`
  margin: 0 0 16px;
  font-weight: 600;
  color: var(--text-primary);
`;

const RingWrap = styled.div`
  position: relative;
  width: 160px;
  height: 160px;
  flex-shrink: 0;
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
  font-size: var(--font-size-display-sm);
  font-weight: 700;
  color: var(--text-primary);
`;

const SmallLabel = styled.span`
  font-size: 12px;
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 13px;
  min-width: 180px;
  flex: 1;
`;

const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

const Key = styled.span`
  width: 12px;
  height: 12px;
  border-radius: 2px;
  background: ${(p) => p.$color};
`;

const Label = styled.span`
  flex: 1;
  font-size: var(--font-size-body-sm)
`;

const Amount = styled.span`
  color: var(--text-primary);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-body-lg)
`;

const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
  background: ${(p) => (p.$direction === "up" ? "var(--success)" : p.$direction === "down" ? "var(--error)" : "var(--warning)")};
  color: var(--bg-panel);
`;

const RING_COLORS = ["var(--color-primary)", "var(--color-secondary)", "var(--color-tertiary)"];

export function GoalRings({ title, subtitle, overall = 0, items = [] }) {
  const radii = [70, 54, 38];

  return (
    <Wrapper>
      <div>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <RingWrap role="img" aria-label={`${overall}% overall`}>
          <svg viewBox="0 0 160 160" width="160" height="160">
            {items.slice(0, 3).map((item, i) => {
              const r = radii[i];
              const c = ringCircumference(r);
              return (
                <React.Fragment key={item.label}>
                  <circle cx="80" cy="80" r={r} fill="none" stroke="var(--border)" strokeWidth="10" />
                  <circle
                    cx="80"
                    cy="80"
                    r={r}
                    fill="none"
                    stroke={RING_COLORS[i]}
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={c}
                    strokeDashoffset={ringOffset(r, item.pct)}
                    transform="rotate(-90 80 80)"
                  />
                </React.Fragment>
              );
            })}
          </svg>
          <Value aria-hidden="true">
            <BigNumber>{overall}%</BigNumber>
            <SmallLabel>Overall</SmallLabel>
          </Value>
        </RingWrap>
      </div>
      <List role="list" aria-label="Goal list">
        {items.map((item, i) => (
          <Row key={item.label}>
            <Key 
              $color={RING_COLORS[i % RING_COLORS.length]} 
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
