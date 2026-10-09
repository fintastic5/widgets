import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const DEFAULT_WIDTH = 588;
const DEFAULT_HEIGHT = 862;

const MIN_WIDTH = 314;
const MAX_WIDTH = 1800;

const MIN_HEIGHT = 314;
const MAX_HEIGHT = 2400;

const RESIZE_STEP = 10;

/* =========================
   Resizable panel
========================= */

const PanelFrame = styled.div`
  position: relative;

  width: ${({ $width }) => `${$width}px`};
  height: ${({ $height }) => `${$height}px`};

  min-width: ${MIN_WIDTH}px;
  min-height: ${MIN_HEIGHT}px;

  max-width: 100%;
  max-height: ${MAX_HEIGHT}px;

  box-sizing: border-box;

  background: var(--bg-panel);
  border: 1px solid var(--border);
  border-radius: 24px;

  overflow: hidden;

  container-type: inline-size;
`;

/* =========================
   Panel content
========================= */

const PanelContent = styled.div`
  width: 100%;
  height: 100%;

  box-sizing: border-box;

  overflow: auto;
`;

/* =========================
   Responsive widget grid
========================= */

const PanelGrid = styled.div`
  display: grid;

  grid-template-columns: 1fr;

  gap: 24px;

  background: var(--bg-panel);

  padding: 32px;

  box-sizing: border-box;

  min-height: 100%;

  /*
   * 1 column
   * < 540px
   */

  /*
   * 2 columns
   */
  @container (min-width: 540px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  /*
   * 3 columns
   */
  @container (min-width: 800px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  /*
   * 4 columns
   */
  @container (min-width: 1060px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

/* =========================
   Widget slot
========================= */

const Slot = styled.div`
  grid-column: span ${({ $size }) => $size};

  display: flex;

  min-width: 0;

  cursor: grab;

  &:active {
    cursor: grabbing;
  }
`;

/* =========================
   Widget card
========================= */

const WidgetCard = styled.div`
  width: 100%;
  min-width: 0;
  min-height: 220px;

  box-sizing: border-box;

  background: var(--bg-widget);
  border: 1px solid var(--border);
  border-radius: 24px;

  padding: 24px;

  display: flex;
  flex-direction: column;
`;

/* =========================
   Empty state
========================= */

const EmptyState = styled.div`
  grid-column: 1 / -1;

  min-height: 220px;

  border: 1px dashed var(--border);
  border-radius: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  color: var(--text-secondary);
  font-size: 14px;
`;

/* =========================
   Resize handles
========================= */

const ResizeHandle = styled.div`
  position: absolute;
  z-index: 999;
  background: transparent !important;
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
  appearance: none !important;
  -webkit-appearance: none !important;
  color: transparent !important;

  &::before,
  &::after {
    display: none !important;
    content: none !important;
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
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
          width: 12px;
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

/* =========================
   Panel
========================= */

export function Panel({ children }) {
  const items = React.Children.toArray(children);

  const [panelWidth, setPanelWidth] = useState(DEFAULT_WIDTH);
  const [panelHeight, setPanelHeight] = useState(DEFAULT_HEIGHT);

  const [dragOrderKeys, setDragOrderKeys] = useState(null);

  const dragIndex = useRef(null);
  const resizeRef = useRef(null);

  /* -------------------------
     Restore panel size
  ------------------------- */

  useEffect(() => {
    const savedWidth = localStorage.getItem("panel-width");
    const savedHeight = localStorage.getItem("panel-height");

    if (savedWidth) {
      const width = Number(savedWidth);

      if (Number.isFinite(width)) {
        setPanelWidth(
          Math.min(
            MAX_WIDTH,
            Math.max(MIN_WIDTH, width)
          )
        );
      }
    }

    if (savedHeight) {
      const height = Number(savedHeight);

      if (Number.isFinite(height)) {
        setPanelHeight(
          Math.min(
            MAX_HEIGHT,
            Math.max(MIN_HEIGHT, height)
          )
        );
      }
    }
  }, []);

  /* -------------------------
     Save panel size
  ------------------------- */

  useEffect(() => {
    localStorage.setItem(
      "panel-width",
      panelWidth
    );

    localStorage.setItem(
      "panel-height",
      panelHeight
    );
  }, [panelWidth, panelHeight]);

  /* -------------------------
     Start resizing
  ------------------------- */

  function startResize(event, handle) {
    event.preventDefault();

    resizeRef.current = {
      handle,
      startX: event.clientX,
      startY: event.clientY,
      startWidth: panelWidth,
      startHeight: panelHeight,
    };

    window.addEventListener(
      "pointermove",
      handleResize
    );

    window.addEventListener(
      "pointerup",
      stopResize
    );
  }

  /* -------------------------
     Resize panel
  ------------------------- */

  function handleResize(event) {
    const resize = resizeRef.current;

    if (!resize) return;

    const dx =
      event.clientX - resize.startX;

    const dy =
      event.clientY - resize.startY;

    let width = resize.startWidth;
    let height = resize.startHeight;

    if (resize.handle.includes("right")) {
      width += dx;
    }

    if (resize.handle.includes("left")) {
      width -= dx;
    }

    if (resize.handle.includes("bottom")) {
      height += dy;
    }

    if (resize.handle.includes("top")) {
      height -= dy;
    }

    width = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, width)
    );

    height = Math.min(
      MAX_HEIGHT,
      Math.max(MIN_HEIGHT, height)
    );

    setPanelWidth(width);
    setPanelHeight(height);
  }

  /* -------------------------
     Stop resizing
  ------------------------- */

  function stopResize() {
    resizeRef.current = null;

    window.removeEventListener(
      "pointermove",
      handleResize
    );

    window.removeEventListener(
      "pointerup",
      stopResize
    );
  }

  /* -------------------------
     Keyboard resizing
  ------------------------- */

  function handleResizeKeyDown(
    event,
    handle
  ) {
    let width = panelWidth;
    let height = panelHeight;

    const step = event.shiftKey
      ? RESIZE_STEP * 5
      : RESIZE_STEP;

    switch (event.key) {
      case "ArrowRight":
        if (handle.includes("right")) {
          width += step;
        }

        if (handle.includes("left")) {
          width -= step;
        }

        break;

      case "ArrowLeft":
        if (handle.includes("right")) {
          width -= step;
        }

        if (handle.includes("left")) {
          width += step;
        }

        break;

      case "ArrowDown":
        if (handle.includes("bottom")) {
          height += step;
        }

        if (handle.includes("top")) {
          height -= step;
        }

        break;

      case "ArrowUp":
        if (handle.includes("bottom")) {
          height -= step;
        }

        if (handle.includes("top")) {
          height += step;
        }

        break;

      default:
        return;
    }

    event.preventDefault();

    width = Math.min(
      MAX_WIDTH,
      Math.max(MIN_WIDTH, width)
    );

    height = Math.min(
      MAX_HEIGHT,
      Math.max(MIN_HEIGHT, height)
    );

    setPanelWidth(width);
    setPanelHeight(height);
  }

  /* -------------------------
     Drag and drop
  ------------------------- */

  const ordered = dragOrderKeys
    ? dragOrderKeys
        .map((key) =>
          items.find(
            (item) => item.key === key
          )
        )
        .filter(Boolean)
    : items;

  function handleDrop(dropIndex) {
    if (
      dragIndex.current === null ||
      dragIndex.current === dropIndex
    ) {
      dragIndex.current = null;
      return;
    }

    setDragOrderKeys((previousOrder) => {
      const order = previousOrder
        ? [...previousOrder]
        : items.map(
            (item) => item.key
          );

      const [moved] = order.splice(
        dragIndex.current,
        1
      );

      order.splice(
        dropIndex,
        0,
        moved
      );

      return order;
    });

    dragIndex.current = null;
  }

  /* -------------------------
     Render
  ------------------------- */

  return (
    <PanelFrame
      $width={panelWidth}
      $height={panelHeight}
      role="region"
      aria-label="Resizable dashboard panel"
    >
      {RESIZE_HANDLES.map((handle) => (
        <ResizeHandle
          key={handle}
          $position={handle}
          role="separator"
          tabIndex={0}
          aria-label={`Resize panel ${handle}`}
          aria-orientation={
            handle === "left" || handle === "right"
              ? "vertical"
              : "horizontal"
          }
          aria-valuenow={
            handle === "left" || handle === "right"
              ? panelWidth
              : panelHeight
          }
          aria-valuemin={ handle === "left" || handle === "right" ? MIN_WIDTH : MIN_HEIGHT } aria-valuemax={ handle === "left" || handle === "right" ? MAX_WIDTH : MAX_HEIGHT }
          onPointerDown={(event) =>
            startResize(
              event,
              handle
            )
          }
          onKeyDown={(event) =>
            handleResizeKeyDown(
              event,
              handle
            )
          }
        />
      ))}

      <PanelContent>
        <PanelGrid
          role="list"
          aria-label="widgets dashboard"
        >
          {items.length === 0 ? (
            <EmptyState>
              No widgets added yet
            </EmptyState>
          ) : (
            ordered.map((item, index) => {
              const size =
                item.props?.size || 1;

              return (
                <Slot
                  key={item.key}
                  $size={size}
                  role="listitem"
                  aria-label={`Widget ${index + 1} of ${ordered.length}`}
                  tabIndex={0}
                  draggable
                  onDragStart={() => {
                    dragIndex.current =
                      index;
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                  }}
                  onDrop={() => {
                    handleDrop(index);
                  }}
                >
                  {item}
                </Slot>
              );
            })
          )}
        </PanelGrid>
      </PanelContent>
    </PanelFrame>
  );
}

export function Widget({ children }) {
  return (
    <WidgetCard>
      {children}
    </WidgetCard>
  );
}