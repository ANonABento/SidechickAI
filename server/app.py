import os
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
MODEL_NAME = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is missing. Put it in server/.env")

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel(MODEL_NAME)

app = Flask(__name__)
# Allow your Next.js dev server
CORS(app, resources={r"/api/*": {"origins": ["http://localhost:3000", "*"]}})

@app.route("/api/ai", methods=["POST"])
def ai():
    try:
        payload = request.get_json(force=True) or {}
        prompt = (payload.get("prompt") or "").strip()
        if not prompt:
            return jsonify({"error": "Missing 'prompt'"}), 400

        # Basic system priming
        sys_preamble = (
            "You are a concise productivity assistant. "
            "Prefer short, actionable answers with clear steps when relevant."
        )
        # Call Gemini
        result = model.generate_content(
            [
                {"role": "user", "parts": [sys_preamble]},
                {"role": "user", "parts": [prompt]},
            ],
            # You can tweak safety/decoding here
            generation_config={
                "max_output_tokens": 512,
                "temperature": 0.3,
                "top_p": 0.9,
                "top_k": 40,
            },
        )

        text = result.text if hasattr(result, "text") and result.text else ""
        if not text:
            text = "I couldn't generate a response."

        return jsonify({
            "response": text.strip(),
            "model": MODEL_NAME,
            "usage": {
                # google-generativeai doesn't expose token counts universally;
                # include placeholders for future instrumentation.
                "approx_tokens": "n/a"
            }
        })
    except Exception as e:
        # Log server-side as needed
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=True)
