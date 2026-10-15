import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Bell, Calendar } from "lucide-react";

const Wrapper = styled.div`
  color: var(--text-secondary, #5b5b63);
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
const BoxRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 12px;
  justify-content: center;
`;
const Box = styled.div`
  box-sizing: border-box;
  background: var(--text-primary, #1c1c1e);
  border-radius: 9px;
  padding: 10px 8px;
  text-align: center;
  width: 59px;
  min-width: 59px;
  height: 85px;
  min-height: 85px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const BoxValue = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
`;
const BoxLabel = styled.div`
  font-size: 16px;
  color: #ffffff;
`;
const Colon = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary, #1c1c1e);
`;
const DateRow = styled.p`
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 0 0 12px;
  font-size: 15px;
  justify-content: center;
  color: var(--text-secondary, #5b5b63);
  svg { flex: none; }
`;
const NotifyButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  color: var(--text-secondary, #5b5b63);
  border: 1px solid var(--border, #dedee5);
  border-radius: 999px;
  padding: 8px 14px;
  font-size: 14px;
  cursor: pointer;
  margin: 0 auto;
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
        <Box><BoxValue>{String(time.days).padStart(2, "0")}</BoxValue><BoxLabel>Days</BoxLabel></Box>
        <Colon>:</Colon>
        <Box><BoxValue>{String(time.hours).padStart(2, "0")}</BoxValue><BoxLabel>Hours</BoxLabel></Box>
        <Colon>:</Colon>
        <Box><BoxValue>{String(time.mins).padStart(2, "0")}</BoxValue><BoxLabel>Mins</BoxLabel></Box>
      </BoxRow>
      <DateRow><Calendar size={14} /> Launch Date: {dateLabel}</DateRow>
      <NotifyButton onClick={onNotify}><Bell size={14} /> Notify Me</NotifyButton>
    </Wrapper>
  );
}
