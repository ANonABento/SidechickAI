"use client";

import { useState } from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

// --- Widgets ---
function NotesWidget() {
  return (
    <div className="h-full p-4 bg-white rounded-lg shadow-md flex flex-col">
      <h3 className="font-bold mb-2">📝 Notes</h3>
      <textarea
        className="flex-1 border rounded p-2"
        placeholder="Write notes here..."
      />
    </div>
  );
}

function CalendarWidget() {
  return (
    <div className="h-full p-4 bg-white rounded-lg shadow-md">
      <h3 className="font-bold mb-2">📅 Calendar</h3>
      <p className="text-gray-500">Calendar goes here</p>
    </div>
  );
}

function ImageWidget() {
  return (
    <div className="h-full p-4 bg-white rounded-lg shadow-md flex flex-col">
      <h3 className="font-bold mb-2">🖼️ Image</h3>
      <input type="file" className="mb-2" />
      <div className="flex-1 bg-gray-100 p-4 text-center rounded">
        Image preview
      </div>
    </div>
  );
}

// Widget mapping
const widgetMap: Record<string, React.FC> = {
  notes: NotesWidget,
  calendar: CalendarWidget,
  image: ImageWidget,
};

// --- Main Dashboard ---
export default function Dashboard() {
  const [widgets, setWidgets] = useState<
    { id: string; type: string; x: number; y: number; w: number; h: number }[]
  >([
    { id: "1", type: "notes", x: 0, y: 0, w: 4, h: 3 },
    { id: "2", type: "calendar", x: 4, y: 0, w: 4, h: 3 },
    { id: "3", type: "image", x: 8, y: 0, w: 4, h: 4 },
  ]);

  // AI Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle AI calls
  const handleAsk = async () => {
    if (!prompt) return;
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.response);
    setLoading(false);
  };

  const handleSpeech = () => {
    if (!response) return;
    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
  };

  // Add/remove widgets
  const addWidget = (type: string) => {
    const newId = (widgets.length + 1).toString();
    setWidgets([
      ...widgets,
      { id: newId, type, x: 0, y: Infinity, w: 4, h: 3 }, // y: Infinity = auto place
    ]);
  };

  const removeWidget = (id: string) => {
    setWidgets(widgets.filter((w) => w.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4">📊 Bento Dashboard</h1>
      <p className="mb-6 text-gray-600">
        Add widgets below and chat with your AI assistant anytime.
      </p>

      {/* Add Widget Menu */}
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

      {/* Grid Layout */}
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

      {/* Floating AI Chat */}
      <div className="fixed bottom-4 right-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          {isChatOpen ? "Close Chat" : "Open Chat"}
        </button>

        {isChatOpen && (
          <div className="mt-2 w-80 bg-white border rounded-lg shadow-lg p-4 flex flex-col space-y-2">
            <div className="flex-1 overflow-y-auto max-h-60 border-b pb-2">
              {response ? (
                <div className="p-2 bg-gray-100 rounded">{response}</div>
              ) : (
                <div className="text-gray-400">AI responses will appear here</div>
              )}
            </div>

            <textarea
              className="w-full p-2 border rounded"
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
            />

            <div className="flex space-x-2">
              <button
                className="flex-1 bg-blue-500 text-white rounded py-1 hover:bg-blue-600"
                onClick={handleAsk}
                disabled={loading || !prompt}
              >
                {loading ? "Thinking..." : "Send"}
              </button>
              <button
                className="bg-green-500 text-white rounded px-2 py-1 hover:bg-green-600"
                onClick={handleSpeech}
              >
                🔊
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
