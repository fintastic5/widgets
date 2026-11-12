import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Bell, Calendar } from "lucide-react";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
`;

const TimeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: 100%;
`;

const Box = styled.div`
  background: var(--color-countdown-bg);
  border: 1px solid var(--color-countdown-border);
  height: 100%;
  width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 16px 6px;
  border-radius: 12px;
`;

const BoxValue = styled.div`
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-semibold);
  color: var(--color-countdown-digit);
`;

const BoxLabel = styled.div`
  font-size: var(--font-size-body-md);
  font-weight: var(--font-weight-medium);
  color: var(--color-countdown-label);
`;

const Colon = styled.span`
  font-size: var(--font-size-display);
  font-weight: var(--font-weight-bold);
  (--color-countdown-btn-border);
`;

const DateRow = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--color-font-secondary);
  font-weight: var(--font-weight-medium);
`;

const Strong = styled.strong`
  color: var(--color-font-primary);
  font-weight: var(--font-weight-medium);
`;

const NotifyButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 8px 16px;
  background-color: var(--color-button-default);
  color: var(--color-font-primary);
  border: 1px solid var(--color-countdown-border);
  border-radius: var(--border-radius-md);
  font-size: var(--font-size-body-sm);
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:focus-visible {
    background-color: var(--color-button-focus);
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  &:active {
    background-color: var(--color-button-active);
    color: var(--color-bg-panel);
    border-color: transparent;
  }

  &[aria-disabled='true'],
  &:disabled {
    color: var(--color-font-disabled);
    background-color: var(--color-button-disabled);
    cursor: not-allowed;
    pointer-events: none;
  }
`;

function timeRemaining(target) {
  const diff = Math.max(0, new Date(target) - new Date());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, mins };
}

export function Countdown({ launchDate, onNotify, onComplete }) {
  const [time, setTime] = useState(() => timeRemaining(launchDate));
  const onCompleteRef = useRef(onComplete);
  const completionRef = useRef({ launchDate, completed: false });

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (completionRef.current.launchDate !== launchDate) {
      completionRef.current = { launchDate, completed: false };
    }

    let id;
    function update() {
      const remaining = new Date(launchDate).getTime() - Date.now();
      setTime(timeRemaining(launchDate));
      if (!Number.isFinite(remaining)) return;
      if (remaining <= 0) {
        if (!completionRef.current.completed) {
          completionRef.current.completed = true;
          onCompleteRef.current?.();
        }
        return;
      }
      id = setTimeout(update, Math.min(60000, remaining));
    }

    update();
    return () => clearTimeout(id);
  }, [launchDate]);

  const dateLabel = new Date(launchDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  
  return (
    <Wrapper>
      <TimeContainer role="timer" aria-label={`${time.days} days, ${time.hours} hours, ${time.mins} minutes remaining`} >
        <Box>
          <BoxValue>{time.days}</BoxValue>
          <BoxLabel>Days</BoxLabel>
        </Box>
        <Colon aria-hidden="true">:</Colon>
        <Box>
          <BoxValue>{time.hours}</BoxValue>
          <BoxLabel>Hours</BoxLabel>
        </Box>
        <Colon aria-hidden="true">:</Colon>
        <Box>
          <BoxValue>{time.mins}</BoxValue>
          <BoxLabel>Mins</BoxLabel>
        </Box>
      </TimeContainer>
      
      <DateRow>
        <Calendar size={14} aria-hidden="true"/> Launch Date:  
        <Strong>{dateLabel}</Strong>
      </DateRow>

      {onNotify && (
        <NotifyButton type="button" onClick={onNotify}>
          <Bell size={14} aria-hidden="true"/> Notify Me
        </NotifyButton>
      )}
    </Wrapper>
  );
}
