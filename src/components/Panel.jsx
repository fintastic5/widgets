import React, { useState, useRef } from "react";
import { styled } from "styled-components";
import { WidgetShell } from "./WidgetShell";

const PanelGrid = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 644px;
  margin: 0 auto;
  font-family: Arial, Helvetica, sans-serif;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  background: var(--bg-panel, #f2f1f7);
  padding: 28px;
  border: 1px solid var(--border, #dedee5);
  border-radius: 14px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 20%);

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    padding: 16px;
    gap: 16px;
  }
`;

const Slot = styled.div`
  grid-column: span ${(p) => p.$size};
  display: flex;
  min-width: 0;
  cursor: grab;
  transition: border-color 0.15s, background-color 0.15s, transform 0.15s;

  ${(p) => p.$dragOver && `
    border: 2px dashed var(--purple-400, #7b5ffa);
    background: var(--bg-panel, #101221);
    transform: scale(1.02);
  `}

  ${(p) => p.$dragging && `
    opacity: 0.5;
    transform: scale(1.02);
  `}

  &:active { cursor: grabbing; }

  @media (max-width: 640px) {
    grid-column: span 1;
  }
`;

const WidgetCard = styled.div`
  box-sizing: border-box;
  background: var(--bg-widget, #ffffff);
  border: 1px solid var(--border, #dedee5);
  border-radius: 26px;
  padding: 24px 26px;
  height: 272px;
  min-height: 272px;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 640px) {
    min-height: 250px;
  }
`;

const EmptyState = styled.div`
  grid-column: 1 / -1;
  border: 2px dashed ${(p) => (p.$dragOver ? "var(--purple-400, #6254f5)" : "var(--border, #dedee5)")};
  border-radius: 24px;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--text-secondary, #5b5b63);
  font-size: 14px;
  gap: 8px;
  transition: border-color 0.15s, background-color 0.15s;
  background: ${(p) => (p.$dragOver ? "var(--bg-panel, #f2f1f7)" : "transparent")};
`;

const EmptyStateIcon = styled.div`
  font-size: 32px;
  opacity: 0.5;
`;

export function Panel({ children }) {
  const items = React.Children.toArray(children);
  const [dragOrderKeys, setDragOrderKeys] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const dragIndex = useRef(null);

  const ordered = dragOrderKeys
    ? dragOrderKeys.map((key) => items.find((item) => item.key === key)).filter(Boolean)
    : items;

  if (items.length === 0) {
    return (
      <PanelGrid onDragOver={(e) => e.preventDefault()} onDrop={() => {}}>
        <EmptyState $dragOver={dragOverIndex === 0}>
          <EmptyStateIcon>📦</EmptyStateIcon>
          Drop widgets here to get started
        </EmptyState>
      </PanelGrid>
    );
  }

  function handleDragStart(index) {
    dragIndex.current = index;
    setDraggingIndex(index);
    setDragOverIndex(index);
  }

  function handleDragEnd() {
    setDraggingIndex(null);
    setDragOverIndex(null);
    dragIndex.current = null;
  }

  function handleDragOver(e, index) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  }

  function handleDragLeave() {
    setDragOverIndex(null);
  }

  function handleDrop(dropIndex) {
    if (dragIndex.current === null || dragIndex.current === dropIndex) {
      dragIndex.current = null;
      setDraggingIndex(null);
      setDragOverIndex(null);
      return;
    }

    setDragOrderKeys((prev) => {
      const order = prev ? [...prev] : ordered.map((item) => item.key);
      const [moved] = order.splice(dragIndex.current, 1);
      order.splice(dropIndex, 0, moved);
      return order;
    });

    dragIndex.current = null;
    setDraggingIndex(null);
    setDragOverIndex(null);
  }

  return (
    <PanelGrid onDragLeave={handleDragLeave} onDragEnd={handleDragEnd}>
      {ordered.map((item, i) => (
        <Slot
          key={item.key}
          $size={item.props?.size === "full" ? 2 : 1}
          $dragOver={dragOverIndex === i}
          $dragging={draggingIndex === i}
          draggable
          onDragStart={() => handleDragStart(i)}
          onDragOver={(e) => handleDragOver(e, i)}
          onDrop={() => handleDrop(i)}
          onDragEnd={handleDragEnd}
        >
          {item}
        </Slot>
      ))}
      {dragOverIndex === ordered.length && (
        <div style={{ gridColumn: "1 / -1", height: "60px", border: "2px dashed var(--purple-400, #7b5ffa)", borderRadius: "12px", background: "var(--bg-panel, #101221)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--purple-400, #7b5ffa)", fontSize: "13px", marginTop: "0.5rem" }}>
          Drop here
        </div>
      )}
    </PanelGrid>
  );
}

export function Widget({
  title,
  subtitle,
  state = "ready",
  onMenuClick,
  children,
}) {
  return (
    <WidgetCard>
      <WidgetShell
        title={title}
        subtitle={subtitle}
        state={state}
        onMenuClick={onMenuClick}
      >
        {children}
      </WidgetShell>
    </WidgetCard>
  );
}
