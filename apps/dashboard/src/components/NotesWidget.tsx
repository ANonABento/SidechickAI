import React from "react";

export default function NotesWidget() {
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