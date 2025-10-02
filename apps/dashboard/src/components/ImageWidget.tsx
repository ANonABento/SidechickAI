import React from "react";

export default function ImageWidget() {
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
