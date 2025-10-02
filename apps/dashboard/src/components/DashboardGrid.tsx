import React from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
// Update the path below to the correct relative path based on your project structure
import { widgetMap, WidgetItem } from "./widgets";

type Props = {
  widgets: WidgetItem[];
  removeWidget: (id: string) => void;
};

export default function DashboardGrid({ widgets, removeWidget }: Props) {
  return (
    <GridLayout
      className="layout"
      cols={12}
      rowHeight={80}
      width={1200}
      isResizable
      isDraggable
    >
      {widgets.map((w) => {
        const Widget = widgetMap[w.type];
        return (
          <div
            key={w.id}
            data-grid={{ x: w.x, y: w.y, w: w.w, h: w.h }}
            className="flex relative"
          >
            <button
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded hover:bg-red-600"
              onClick={() => removeWidget(w.id)}
            >
              ✕
            </button>
            <Widget />
          </div>
        );
      })}
    </GridLayout>
  );
}
