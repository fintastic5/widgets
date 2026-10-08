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
  color: var(--text-secondary, #c1c4e5);
`;

const Title = styled.p`
  margin: 0;
  font-size: 14px;
`;

const Subtitle = styled.p`
  margin: 0;
  font-weight: 600;
  color: var(--text-primary, #f9f9fa);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary, #c1c4e5);
  cursor: pointer;
  padding: 4px;
  display: flex;
`;

const StateMessage = styled.div`
  color: var(--text-secondary, #c1c4e5);
  font-size: 13px;
  padding: 24px 0;
  text-align: center;
`;

const Skeleton = styled.div`
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--border, #343875) 25%, var(--bg-panel, #101221) 50%, var(--border, #343875) 75%);
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
