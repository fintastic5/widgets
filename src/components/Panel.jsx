import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const CARD_SIZE = 250;
const PANEL_PADDING = 32;
const GRID_GAP = 24;
const PANEL_BORDER = 1;

const DEFAULT_WIDTH =
  CARD_SIZE * 2 +
  GRID_GAP +
  PANEL_PADDING * 2 +
  PANEL_BORDER * 2; 

const DEFAULT_HEIGHT =
  CARD_SIZE * 3 +
  GRID_GAP * 2 +
  PANEL_PADDING * 2 +
  PANEL_BORDER * 2;

const MIN_WIDTH =
  CARD_SIZE +
  PANEL_PADDING * 2 +
  PANEL_BORDER * 2;

const MIN_HEIGHT =
  CARD_SIZE +
  PANEL_PADDING * 2 +
  PANEL_BORDER * 2;

const RESIZE_STEP = 10;

// Keep dimension within its minimum and maximum.
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), Math.max(min, max));
}

/* Snap panel dimension to the nearest card boundary. */
function snapPanelSize(value, max) {
  const availableSize =
    max - PANEL_PADDING * 2 - PANEL_BORDER * 2;

  // Find the maximum number of cards that can fit.
  const maxTracks = Math.max(
    1,
    Math.floor(
      (availableSize + GRID_GAP) /
        (CARD_SIZE + GRID_GAP)
    )
  );

  // Find the nearest number of cards to the current size.
  const nearest = Math.round(
    (
      value -
      PANEL_PADDING * 2 -
      PANEL_BORDER * 2 +
      GRID_GAP
    ) /
      (CARD_SIZE + GRID_GAP)
  );

  // Keep the result between one card and the maximum.
  const tracks = Math.min(
    Math.max(nearest, 1),
    maxTracks
  );

  // Return the exact panel size for that number of cards.
  return (
    tracks * CARD_SIZE +
    (tracks - 1) * GRID_GAP +
    PANEL_PADDING * 2 +
    PANEL_BORDER * 2
  );
}

// Load a saved size, or use the default.
function getSavedSize(key, fallback, min, dimension) {
  if (typeof window === "undefined") return fallback;

  const viewport = dimension === "width"
    ? window.innerWidth
    : window.innerHeight;

  const saved = Number(window.localStorage.getItem(key));

  return clamp(
    Number.isFinite(saved) && window.localStorage.getItem(key) !== null
      ? saved
      : fallback,
    min,
    viewport
  );
}

/* Resizable panel */
const PanelFrame = styled.div`
  position: relative;

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  min-width: ${MIN_WIDTH}px;
  min-height: ${MIN_HEIGHT}px;

  max-width: 100vw;
  max-height: 100vh;

  background: var(--color-bg-panel);
  border: 1px solid var(--color-border);
  border-radius: var(--widget-border-radius);

  overflow: hidden;
`;

/* Panel content */
const PanelContent = styled.div`
  position: relative;
  z-index: 1;

  width: 100%;
  height: 100%;
  padding: ${PANEL_PADDING}px;
  box-sizing: border-box;
  overflow: auto;

  container-type: inline-size;
  container-name: panel-content;
`;

/* Responsive widget grid */
const PanelGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, ${CARD_SIZE}px), ${CARD_SIZE}px)
  );
  grid-auto-rows: minmax(${CARD_SIZE}px, auto);
  gap: ${GRID_GAP}px;
  min-width: 0;
  width: 100%;
  align-content: start;
`;

/* Widget slot */
const Slot = styled.div`
  grid-column: span ${(p) => p.$size};
  grid-row: span ${(p) => p.$rows};
  cursor: grab;

  transition:
    border-color 0.15s,
    background-color 0.15s,
    transform 0.15s,
    opacity 0.15s;

  ${(p) => 
    p.$dragOver &&
    `
      border: 2px dashed var(--color-primary);
      border-radius: var(--widget-border-radius);
      outline-offset: 2px;
      background: var(--color-bg-panel);
    `}

  ${(p) =>
    p.$dragging &&
    `
      opacity: 0.5;
      transform: scale(1.02);
    `}

  &:active {
    cursor: grabbing;
  }

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }

  /* Wide widgets stack vertically when only one column fits. */
  @container panel-content (max-width: 519px) {
    grid-column: span 1;
  }
`;

/* Widget card */
const WidgetCard = styled.div`
  container-type: inline-size;
  container-name: widget-card;

  background: var(--color-bg-widget);
  border: 1px solid var(--color-border);
  border-radius: var(--widget-border-radius);
  padding: 24px;

  box-sizing: border-box;
  width: 100%;
  height: 100%;
  min-width: 0;

  display: flex;
  flex-direction: column;

  &:focus-visible {
    outline: 2px solid var(--color-primary);
    outline-offset: 2px;
  }
`;

/* Empty state */
const EmptyState = styled.div`
  grid-column: 1 / -1;
  min-height: ${CARD_SIZE}px;

  border: 2px dashed
    ${({ $dragOver }) =>
      $dragOver
        ? "var(--color-primary, #7b5ffa)"
        : "var(--color-border, #343875)"};

  border-radius: var(--widget-border-radius);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;

  color: var(--color-font-secondary, #c1c4e5);
  font-size: 14px;

  background: ${({ $dragOver }) =>
    $dragOver ? "var(--color-bg-panel, #101221)" : "transparent"};

  transition: border-color 0.15s, background-color 0.15s;
`;

const EmptyStateIcon = styled.div`
  font-size: 32px;
  opacity: 0.5;
`;

/* Drop indicator */

const DropIndicator = styled.div`
  grid-column: 1 / -1;
  height: 60px;

  border: 2px dashed var(--color-primary, #7b5ffa);
  border-radius: var(--widget-border-radius, );

  background: var(--color-bg-panel, #101221);
  color: var(--color-primary, #7b5ffa);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 13px;
`;

/* Resize handles */
const ResizeHandle = styled.div`
  position: absolute;
  z-index: 2;

  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;

  appearance: none !important;
  -webkit-appearance: none !important;
  color: transparent !important;

  touch-action: none;

  &::before,
  &::after {
    display: none !important;
    content: none !important;
  }

  &:hover,
  &:focus,
  &:focus-visible,
  &:active {
    background: transparent !important;
    border: none !important;
    outline: none !important;
    box-shadow: none !important;
  }

  ${({ $position }) => {
    switch ($position) {
      case "top":
        return `
          top: 0;
          left: 16px;
          right: 16px;
          height: 12px;
          cursor: ns-resize;
        `;

      case "bottom":
        return `
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 12px;
          cursor: ns-resize;
        `;

      case "left":
        return `
          top: 16px;
          bottom: 16px;
          left: 0;
          width: 12px;
          cursor: ew-resize;
        `;

      case "right":
        return `
          top: 16px;
          bottom: 16px;
          right: 0;
          width: 4px;
          cursor: ew-resize;
        `;

      case "top-left":
        return `
          top: 0;
          left: 0;
          width: 16px;
          height: 16px;
          cursor: nwse-resize;
        `;

      case "top-right":
        return `
          top: 0;
          right: 0;
          width: 16px;
          height: 16px;
          cursor: nesw-resize;
        `;

      case "bottom-left":
        return `
          bottom: 0;
          left: 0;
          width: 16px;
          height: 16px;
          cursor: nesw-resize;
        `;

      case "bottom-right":
        return `
          bottom: 0;
          right: 0;
          width: 16px;
          height: 16px;
          cursor: nwse-resize;
        `;

      default:
        return "";
    }
  }}
`;

const RESIZE_HANDLES = [
  "top",
  "bottom",
  "left",
  "right",
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
];

/* Panel */
export function Panel({ children }) {
  const items = React.Children.toArray(children);

  const [panelWidth, setPanelWidth] = useState(() =>
    getSavedSize("panel-width", DEFAULT_WIDTH, MIN_WIDTH, "width")
  );

  const [panelHeight, setPanelHeight] = useState(() =>
    getSavedSize("panel-height", DEFAULT_HEIGHT, MIN_HEIGHT, "height")
  );

  const [dragOrderKeys, setDragOrderKeys] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const dragIndex = useRef(null);
  const resizeRef = useRef(null);

  // Save the panel dimensions.
  useEffect(() => {
    localStorage.setItem("panel-width", panelWidth);
    localStorage.setItem("panel-height", panelHeight);
  }, [panelWidth, panelHeight]);

  // Keep the panel within the viewport when the window changes size.
  useEffect(() => {
    function handleViewportResize() {
      setPanelWidth((width) =>
        clamp(width, MIN_WIDTH, window.innerWidth)
      );

      setPanelHeight((height) =>
        clamp(height, MIN_HEIGHT, window.innerHeight)
      );
    }

    window.addEventListener("resize", handleViewportResize);

    return () => {
      window.removeEventListener("resize", handleViewportResize);
    };
  }, []);

  // Restore the user's saved widget order.
  const ordered = dragOrderKeys
    ? [
        ...dragOrderKeys
          .map((key) => items.find((item) => item.key === key))
          .filter(Boolean),
        ...items.filter((item) => !dragOrderKeys.includes(item.key)),
      ]
    : items;

  /* Resizing */
  function startResize(event, handle) {
    event.preventDefault();

    resizeRef.current = {
      handle,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: panelWidth,
      startHeight: panelHeight,
      currentWidth: panelWidth,
      currentHeight: panelHeight,
    };

    window.addEventListener("pointermove", handleResize);
    window.addEventListener("pointerup", stopResize);
    window.addEventListener("pointercancel", stopResize);
  }

  function handleResize(event) {
    const resize = resizeRef.current;

    if (!resize) return;

    const dx = event.clientX - resize.startX;
    const dy = event.clientY - resize.startY;

    let width = resize.startWidth;
    let height = resize.startHeight;

    if (resize.handle.includes("right")) width += dx;
    if (resize.handle.includes("left")) width -= dx;
    if (resize.handle.includes("bottom")) height += dy;
    if (resize.handle.includes("top")) height -= dy;

    // Keep the dimensions within the allowed limits.
    width = clamp(width, MIN_WIDTH, window.innerWidth);
    height = clamp(height, MIN_HEIGHT, window.innerHeight);

    // Store the latest dimensions for the pointer-up event.
    resize.currentWidth = width;
    resize.currentHeight = height;

    setPanelWidth(width);
    setPanelHeight(height);
  }

  function stopResize() {
  const resize = resizeRef.current;

  if (resize) {
    // Snap to the nearest complete column or row.
    const snappedWidth = snapPanelSize(
      resize.currentWidth ?? resize.startWidth,
      window.innerWidth
    );

    const snappedHeight = snapPanelSize(
      resize.currentHeight ?? resize.startHeight,
      window.innerHeight
    );

      setPanelWidth(snappedWidth);
      setPanelHeight(snappedHeight);
    }

    resizeRef.current = null;

    window.removeEventListener("pointermove", handleResize);
    window.removeEventListener("pointerup", stopResize);
    window.removeEventListener("pointercancel", stopResize);
  }

  // Allow keyboard users to resize using the arrow keys.
  function handleResizeKeyDown(event, handle) {
    let width = panelWidth;
    let height = panelHeight;

    const step = event.shiftKey ? RESIZE_STEP * 5 : RESIZE_STEP;

    switch (event.key) {
      case "ArrowRight":
        if (handle.includes("right")) width += step;
        if (handle.includes("left")) width -= step;
        break;

      case "ArrowLeft":
        if (handle.includes("right")) width -= step;
        if (handle.includes("left")) width += step;
        break;

      case "ArrowDown":
        if (handle.includes("bottom")) height += step;
        if (handle.includes("top")) height -= step;
        break;

      case "ArrowUp":
        if (handle.includes("bottom")) height -= step;
        if (handle.includes("top")) height += step;
        break;

      default:
        return;
    }

    event.preventDefault();

    setPanelWidth(clamp(width, MIN_WIDTH, window.innerWidth));
    setPanelHeight(clamp(height, MIN_HEIGHT, window.innerHeight));
  }

  /* Drag and drop */
  function handleDragStart(index) {
    dragIndex.current = index;
    setDraggingIndex(index);
    setDragOverIndex(null);
  }

  function handleDragEnd() {
    dragIndex.current = null;
    setDraggingIndex(null);
    setDragOverIndex(null);
  }

  function handleDragOver(event, index) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  }

  function handleGridDragOver(event) {
    event.preventDefault();

    // Show the end-of-list indicator when dragging over empty grid space.
    if (event.target === event.currentTarget) {
      setDragOverIndex(ordered.length);
    }
  }

  function handleDrop(dropIndex) {
    const sourceIndex = dragIndex.current;

    if (sourceIndex === null || sourceIndex === dropIndex) {
      handleDragEnd();
      return;
    }

    setDragOrderKeys((previousOrder) => {
      const order = previousOrder
        ? [
            ...previousOrder.filter((key) =>
              ordered.some((item) => item.key === key)
            ),
          ]
        : ordered.map((item) => item.key);

      // Include any new items that were added after the order was saved.
      for (const item of ordered) {
        if (!order.includes(item.key)) order.push(item.key);
      }

      const [moved] = order.splice(sourceIndex, 1);

      if (moved !== undefined) {
        order.splice(dropIndex, 0, moved);
      }

      return order;
    });

    handleDragEnd();
  }

  return (
    <PanelFrame
      $width={panelWidth}
      $height={panelHeight}
      role="region"
      aria-label="Resizable dashboard panel"
    >
      {RESIZE_HANDLES.map((handle) => {
        const isHorizontal = ["left", "right"].includes(handle);

        return (
          <ResizeHandle
            key={handle}
            $position={handle}
            role="separator"
            tabIndex={0}
            aria-label={`Resize panel ${handle}`}
            aria-orientation={
              isHorizontal ? "vertical" : "horizontal"
            }
            aria-valuenow={
              isHorizontal ? panelWidth : panelHeight
            }
            aria-valuemin={
              isHorizontal ? MIN_WIDTH : MIN_HEIGHT
            }
            aria-valuemax={
              typeof window === "undefined"
                ? isHorizontal
                  ? panelWidth
                  : panelHeight
                : isHorizontal
                  ? window.innerWidth
                  : window.innerHeight
            }
            onPointerDown={(event) => startResize(event, handle)}
            onKeyDown={(event) => handleResizeKeyDown(event, handle)}
          />
        );
      })}

      <PanelContent>
        <PanelGrid
          role="list"
          aria-label="Widgets dashboard"
          onDragOver={handleGridDragOver}
          onDragLeave={() => setDragOverIndex(null)}
          onDragEnd={handleDragEnd}
          onDrop={(event) => {
            event.preventDefault();

            if (event.target === event.currentTarget) {
              handleDrop(ordered.length);
            }
          }}
        >
          {items.length === 0 ? (
            <EmptyState $dragOver={dragOverIndex === 0}>
              <EmptyStateIcon>📦</EmptyStateIcon>
              Drop widgets here to get started
            </EmptyState>
          ) : (
            ordered.map((item, index) => {
              const size = Math.max(1, Number(item.props?.size) || 1);
              const rows = Math.max(1, Number(item.props?.rows) || 1);

              return (
                <Slot
                  key={item.key}
                  $size={size}
                  $rows={rows}
                  $dragOver={dragOverIndex === index}
                  $dragging={draggingIndex === index}
                  role="listitem"
                  aria-label={`Widget ${index + 1} of ${ordered.length}`}
                  tabIndex={0}
                  draggable
                  onDragStart={() => handleDragStart(index)}
                  onDragOver={(event) => handleDragOver(event, index)}
                  onDragLeave={() => setDragOverIndex(null)}
                  onDrop={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleDrop(index);
                  }}
                  onDragEnd={handleDragEnd}
                >
                  {item}
                </Slot>
              );
            })
          )}

          {items.length > 0 &&
            dragOverIndex === ordered.length && (
              <DropIndicator>Drop here</DropIndicator>
            )}
        </PanelGrid>
      </PanelContent>
    </PanelFrame>
  );
}

// Simple wrapper that applies the card styling.
export function Widget({ children }) {
  return <WidgetCard>{children}</WidgetCard>;
}