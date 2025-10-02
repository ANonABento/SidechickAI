import React, { useState } from "react";
import { askAI } from "../lib/ai-api";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!prompt) return;
    try {
      setLoading(true);
      const data = await askAI(prompt);
      setResponse(data.response);
    } catch (e: any) {
      setResponse(`Error: ${e.message ?? "AI call failed"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeech = () => {
    if (!response) return;
    const utterance = new SpeechSynthesisUtterance(response);
    speechSynthesis.speak(utterance);
  };

  return (
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
  );
}
