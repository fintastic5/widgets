import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Bell, Calendar } from "lucide-react";

const Wrapper = styled.div`
  color: var(--text-secondary, #c1c4e5);
`;
const Title = styled.p`
  margin: 0;
  font-size: 14px;
`;
const Subtitle = styled.p`
  margin: 0 0 16px;
  font-weight: 600;
  color: var(--text-primary, #f9f9fa);
`;
const BoxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
`;
const Box = styled.div`
  background: var(--bg-panel, #101221);
  border-radius: 12px;
  padding: 10px 14px;
  text-align: center;
  min-width: 56px;
`;
const BoxValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: var(--text-primary, #f9f9fa);
`;
const BoxLabel = styled.div`
  font-size: 11px;
  color: var(--text-secondary, #c1c4e5);
`;
const Colon = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--border, #343875);
`;
const DateRow = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 12px;
  font-size: 13px;
`;
const NotifyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--border, #343875);
  color: var(--text-primary, #f9f9fa);
  border: none;
  border-radius: 999px;
  padding: 8px 16px;
  font-size: 13px;
  cursor: pointer;
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
    day: "numeric", month: "short", year: "numeric",
  });

  return (
    <Wrapper>
      {title && <Title>{title}</Title>}
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
      <BoxRow role="timer" aria-label={`${time.days} days, ${time.hours} hours, ${time.mins} minutes remaining`}>
        <Box><BoxValue>{time.days}</BoxValue><BoxLabel>Days</BoxLabel></Box>
        <Colon>:</Colon>
        <Box><BoxValue>{time.hours}</BoxValue><BoxLabel>Hours</BoxLabel></Box>
        <Colon>:</Colon>
        <Box><BoxValue>{time.mins}</BoxValue><BoxLabel>Mins</BoxLabel></Box>
      </BoxRow>
      <DateRow><Calendar size={14} /> Launch Date: {dateLabel}</DateRow>
      <NotifyButton onClick={onNotify}><Bell size={14} /> Notify Me</NotifyButton>
    </Wrapper>
  );
}
