import { useEffect, useState } from "react";
import styled from "styled-components";
import { Bell, Calendar } from "lucide-react";

const Wrapper = styled.div`
  color: var(--text-secondary);
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

const BoxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 16px;
`;

const Box = styled.div`
  background: var(--bg-panel);
  border-radius: 12px;
  padding: 18px 2px;
  text-align: center;
  min-width: 56px;
`;

const BoxValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary);
  padding-bottom: 8px;
`;

const BoxLabel = styled.div`
  font-size: 11px;
  color: var(--text-secondary);
`;

const Colon = styled.span`
  font-size: 24px;
  font-weight: 700;
  color: var(--border);
`;

const DateRow = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 12px;
  font-size: 13px;
  color: var(--text-primary);
`;

const Strong = styled.strong`
  color: var(--text-secondary);
  font-weight: var(--font-weight-medium) 
`;

const NotifyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--border);
  color: var(--text-primary);
  border: none;
  border-radius: 16px;
  padding: 8px 16px;
  font-size: var(--font-size-body-sm);
  cursor: pointer;

  &:hover {
    background-color: var(--color-primary);
  }

  &:focus-visible {
    background-color: var(--color-button-focus);
    outline: 3px solid var(--color-primary);
    outline-offset: 3px;
  }

  &:active {
    transform: translateY(1px);
  }

  &[aria-disabled='true'],
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (min-width: 640px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

function timeRemaining(target) {
  const diff = Math.max(0, new Date(target) - new Date());
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, mins };
}

export function Countdown({ title, subtitle, launchDate, onNotify }) {
  const [time, setTime] = useState(() => timeRemaining(launchDate));

  useEffect(() => {
    const id = setInterval(() => setTime(timeRemaining(launchDate)), 60000);
    return () => clearInterval(id);
  }, [launchDate]);

  const dateLabel = new Date(launchDate).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <BoxRow role="timer" aria-label={`${time.days} days, ${time.hours} hours, ${time.mins} minutes remaining`} >
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
      </BoxRow>
      
      <DateRow>
        <Calendar size={16} aria-hidden="true"/> Launch Date:  
        <Strong>{dateLabel}</Strong>
      </DateRow>

      <NotifyButton 
        type="button"
        onClick={onNotify}
        aria-label="Notify me when the timer begins"
      >
        <Bell size={16} aria-hidden="true"/> Notify Me
      </NotifyButton>
    </Wrapper>
  );
}
