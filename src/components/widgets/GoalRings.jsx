import React from "react";
import { styled } from "styled-components";
import { ringCircumference, ringOffset } from "./ringMath";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px;
  color: var(--text-secondary, #5b5b63);
  min-width: 0;

  > div {
    flex: 0 0 184px;
    min-width: 0;
  }
`;
const Title = styled.p`
  margin: 0;
  font-size: 20px;
`;
const Subtitle = styled.p`
  margin: 0 0 14px;
  font-weight: 400;
  color: var(--text-secondary, #5b5b63);
`;
const RingWrap = styled.div`
  position: relative;
  width: 154px;
  height: 154px;
  margin: 0 auto;
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
  font-size: 26px;
  font-weight: 700;
  color: var(--text-primary, #111111);
`;
const SmallLabel = styled.span`
  font-size: 14px;
`;
const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  font-size: 15px;
  width: 240px;
  min-width: 240px;
  flex: 0 0 240px;
  margin-left: 71px;
`;
const Row = styled.li`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;
const Dot = styled.span`
  width: 13px;
  height: 13px;
  border-radius: 3px;
  background: ${(p) => p.$color};
`;
const Label = styled.span`
  flex: 1;
`;
const Amount = styled.span`
  color: var(--text-primary, #111111);
  font-weight: 600;
`;
const Badge = styled.span`
  font-size: 11px;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 999px;
  background: ${(p) => (p.$direction === "up" ? "#d9f1e2" : p.$direction === "down" ? "#f7d9dc" : "#fff0c2")};
  color: ${(p) => (p.$direction === "up" ? "#16843c" : p.$direction === "down" ? "#bf303b" : "#9a6200")};
`;

const RING_COLORS = ["#6254f5", "#078bff", "#00a4ad"];

export function GoalRings({ title, subtitle, overall = 0, items = [] }) {
  const radii = [70, 54, 38];

  return (
    <Wrapper>
      <div>
        {title && <Title>{title}</Title>}
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
        <RingWrap role="img" aria-label={`${overall}% overall`}>
          <svg viewBox="0 0 160 160" width="154" height="154">
            {items.slice(0, 3).map((item, i) => {
              const r = radii[i];
              const c = ringCircumference(r);
              return (
                <React.Fragment key={item.label}>
                  <circle cx="80" cy="80" r={r} fill="none" stroke="var(--border, #eeeeef)" strokeWidth="10" />
                  <circle
                    cx="80" cy="80" r={r} fill="none" stroke={RING_COLORS[i]} strokeWidth="10"
                    strokeLinecap="round" strokeDasharray={c} strokeDashoffset={ringOffset(r, item.pct)}
                    transform="rotate(-90 80 80)"
                  />
                </React.Fragment>
              );
            })}
          </svg>
          <Value><BigNumber>{overall}%</BigNumber><SmallLabel>Overall</SmallLabel></Value>
        </RingWrap>
      </div>
      <List>
        {items.map((item, i) => (
          <Row key={item.label}>
            <Dot $color={RING_COLORS[RING_COLORS.length - 1 - (i % RING_COLORS.length)]} />
            <Label>{item.label}</Label>
            <Amount>{item.amount}</Amount>
            {item.change !== undefined && (
              <Badge $direction={item.change > 0 ? "up" : item.change < 0 ? "down" : "flat"}>
                {item.change > 0 ? "+" : ""}{item.change}%
              </Badge>
            )}
          </Row>
        ))}
      </List>
    </Wrapper>
  );
}
