import styled from "styled-components";
import { MoreVertical } from "lucide-react";
import { WidgetErrorBoundary } from "./WidgetErrorBoundary";

const Shell = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
  min-height: 0;
  width: 100%;
  height: 100%;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 8px;
  flex-shrink: 0;
`;

const Title = styled.p`
  font-size: var(--font-size-heading);
  font-weight: var(--font-weight-semibold);
  color: var(--color-font-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: var(--font-size-body-sm);
  font-weight: var(--font-weight-medium);
  letter-spacing: 0.05em;
  color: var(--color-font-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
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
  background: linear-gradient(90deg, var(--border) 25%, var(--color-bg-panel) 50%, var(--border) 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  min-height: 0;
  min-width: 0;
`;

// WidgetShell owns the header, menu slot and the loading/error/empty/ready states.
export function WidgetShell({ title, subtitle, state = "ready", onMenuClick, children }) {
  return (
    <Shell>
      <Header>
        <div>
          <Title>{title}</Title>
          <Subtitle>{subtitle}</Subtitle>
        </div>
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
