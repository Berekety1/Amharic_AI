import { useState } from 'react';
import TTSForm from './components/TTSForm.jsx';

export default function App() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  return (
    <div className="app">
      <header>
        <h1>አማርኛ ወደ ድምጽ (Amharic TTS)</h1>
        <p className="tagline">Type it → Hear it. Backend: n8n, Frontend: React.</p>
      </header>

      <TTSForm
        onStart={() => { setLoading(true); setError(''); setAudioUrl(null); }}
        onFinish={(url) => { setLoading(false); setAudioUrl(url); }}
        onError={(msg) => { setLoading(false); setError(msg); }}
      />

      {loading && <div className="spinner" aria-label="loading" />}
      {error && <p className="error">{error}</p>}

      {audioUrl && (
        <div className="playerBox">
          <audio controls src={audioUrl} />
          <a className="downloadBtn" href={audioUrl} download="amharic-tts.mp3">Download MP3</a>
        </div>
      )}

      <footer>
        <small>Built fast & dirty. Clean it as you wish. © {new Date().getFullYear()}</small>
      </footer>
    </div>
  );
}