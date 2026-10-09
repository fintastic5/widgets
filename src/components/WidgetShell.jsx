import styled from "styled-components";
import { MoreVertical } from "lucide-react";
import { WidgetErrorBoundary } from "./WidgetErrorBoundary";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const HeaderText = styled.div`
  color: var(--text-secondary);
`;

const Title = styled.p`
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
  
`;

const Subtitle = styled.p`
  margin: 0;
  font-size: var(--font-size-subtitle);
  color: var(--text-secondary);
`;

const MenuButton = styled.button`
  background: none;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 4px;
  display: flex;
`;

const StateMessage = styled.div`
  color: var(--text-secondary);
  font-size: 13px;
  padding: 24px 0;
  text-align: center;
`;

const Skeleton = styled.div`
  height: 140px;
  border-radius: 12px;
  background: linear-gradient(90deg, var(--border) 25%, var(--bg-panel) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const Content = styled.div`
  flex: 1;
  min-height: 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
`;

// WidgetShell owns the header, menu slot and the loading/error/empty/ready states.
export function WidgetShell({ title, subtitle, state = "ready", onMenuClick, children }) {
  return (
    <Shell>
      <Header>
        <HeaderText>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </HeaderText>
        {onMenuClick && (
          <MenuButton onClick={onMenuClick} aria-label="Widget options">
            <MoreVertical size={16} />
          </MenuButton>
        )}
      </Header>

      <Content>
        <WidgetErrorBoundary>
          {state === "loading" && <Skeleton aria-label="Loading" />}
          {state === "error" && <StateMessage>Couldn't load this widget.</StateMessage>}
          {state === "empty" && <StateMessage>No data yet.</StateMessage>}
          {state === "ready" && children}
        </WidgetErrorBoundary>
      </Content>
    </Shell>
  );
}
