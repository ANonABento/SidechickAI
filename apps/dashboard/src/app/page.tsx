"use client";

import { useState } from "react";
import DashboardGrid from "../components/DashboardGrid";
import AIChat from "../components/AIChat";
import { WidgetItem } from "../components/widgets";

// ...existing code...
export default function Dashboard() {
  const [widgets, setWidgets] = useState<WidgetItem[]>([
    { id: "1", type: "notes", x: 0, y: 0, w: 4, h: 3 },
    { id: "2", type: "calendar", x: 4, y: 0, w: 4, h: 3 },
    { id: "3", type: "image", x: 8, y: 0, w: 4, h: 4 },
  ]);

  const [isChatOpen, setIsChatOpen] = useState(false);

  const addWidget = (type: string) => {
    const newId = (widgets.length + 1).toString();
    setWidgets([
      ...widgets,
      { id: newId, type, x: 0, y: Infinity, w: 4, h: 3 },
    ]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">📊 Bento Dashboard</h1>
      <p className="mb-6 text-gray-600">
        Add widgets below and chat with your AI assistant anytime.
      </p>

      <div className="flex gap-2 mb-6">
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
          onClick={() => addWidget("notes")}
        >
          + Notes
        </button>
        <button
          className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600"
          onClick={() => addWidget("calendar")}
        >
          + Calendar
        </button>
        <button
          className="bg-purple-500 text-white px-3 py-2 rounded hover:bg-purple-600"
          onClick={() => addWidget("image")}
        >
          + Image
        </button>
      </div>

      <DashboardGrid widgets={widgets} removeWidget={removeWidget} />

      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? "Close Chat" : "Open Chat"}
        </button>

        {isChatOpen && <AIChat />}
      </div>
    </div>
  );
}
// ...existing code...
