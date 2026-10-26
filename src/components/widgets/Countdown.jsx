import { useEffect, useState } from "react";
import styled from "styled-components";
import { Bell, Calendar, Check } from "lucide-react";

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

export function Countdown({ launchDate, onNotify }) {
  const [time, setTime] = useState(() => timeRemaining(launchDate));

  const [isTimerSet, setIsTimerSet] = useState(false);

  useEffect(() => {
  if (!isTimerSet) return;

  const id = setInterval(() => {
    setTime(timeRemaining(launchDate));
  }, 60000);

  return () => clearInterval(id);
}, [launchDate, isTimerSet]);

  const dateLabel = new Date(launchDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  
  function handleTimerToggle() {
    onNotify?.();
    setIsTimerSet((prev) => !prev);
  }

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

      <NotifyButton 
        type="button"
        onClick={handleTimerToggle}
        aria-label={isTimerSet ? "Stop countdown" : "Start countdown"}
      >
        {isTimerSet ? (
          <>
            <Check size={14} aria-hidden="true" />
            Countdown Running
          </>
        ) : (
          <>
            <Bell size={14} aria-hidden="true"/> Notify Me
          </>
        )}
      </NotifyButton>
    </Wrapper>
  );
}
