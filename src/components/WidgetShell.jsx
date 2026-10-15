import { styled } from "styled-components";
import { MoreVertical } from "lucide-react";
import { WidgetErrorBoundary } from "./WidgetErrorBoundary";

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const HeaderText = styled.div`
  color: var(--text-primary, #171719);
`;

const Title = styled.p`
  margin: 0;
  font-size: 20px;
  line-height: 1.2;
  font-weight: 700;
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: 16px;
  line-height: 1.2;
  font-weight: 400;
  color: var(--text-secondary, #5b5b63);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary, #5b5b63);
  cursor: pointer;
  padding: 4px;
  display: flex;
`;

const StateMessage = styled.div`
  color: var(--text-secondary, #5b5b63);
  font-size: 13px;
  padding: 24px 0;
  text-align: center;
`;

const Skeleton = styled.div`
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--border, #dedee5) 25%, var(--bg-panel, #f2f1f7) 50%, var(--border, #dedee5) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

export function WidgetShell({ title, subtitle, state = "ready", onMenuClick, children }) {
  return (
    <div>
      <Header>
        <HeaderText>
          {title && <Title>{title}</Title>}
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </HeaderText>
        {onMenuClick && (
          <MenuButton type="button" onClick={onMenuClick} aria-label="Widget options">
            <MoreVertical size={16} />
          </MenuButton>
        )}
      </Header>
      <WidgetErrorBoundary>
        {state === "loading" && <Skeleton aria-label="Loading" />}
        {state === "error" && <StateMessage>Couldn't load this widget.</StateMessage>}
        {state === "empty" && <StateMessage>No data yet.</StateMessage>}
        {state === "ready" && children}
      </WidgetErrorBoundary>
    </div>
  );
}
