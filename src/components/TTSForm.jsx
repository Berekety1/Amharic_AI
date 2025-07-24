import { useState } from 'react';
import { sendTextToTTS } from '../api.js';

export default function TTSForm({ onStart, onFinish, onError }) {
  const [text, setText] = useState('ሰላም ዓለም!');
  const [voice, setVoice] = useState('female');
  const [speed, setSpeed] = useState(1);

  const maxChars = 2000;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return onError('Empty text.');
    if (text.length > maxChars) return onError(`Max ${maxChars} chars.`);

    try {
      onStart();
      const url = await sendTextToTTS({ text, voice, speed });
      onFinish(url);
    } catch (err) {
      console.error(err);
      onError('TTS failed. Check console / backend.');
    }
  };

  return (
    <form className="ttsForm" onSubmit={handleSubmit}>
      <label htmlFor="text">ይጻፉ (Enter Amharic text)</label>
      <textarea
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        maxLength={maxChars}
        rows={6}
        placeholder="እዚህ ያስገቡ..."
      />
      <div className="charCount">{text.length}/{maxChars}</div>

      <div className="row">
        <div className="field">
          <label htmlFor="voice">Voice</label>
          <select id="voice" value={voice} onChange={(e) => setVoice(e.target.value)}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="robotic">Robotic (if your engine supports)</option>
          </select>
        </div>

        <div className="field">
          <label htmlFor="speed">Speed: {speed}x</label>
          <input
            id="speed"
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="submitBtn">Speak</button>
    </form>
  );
}