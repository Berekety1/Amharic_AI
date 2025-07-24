import { b64toBlob } from './utils/b64toBlob.js';

const WEBHOOK = import.meta.env.VITE_N8N_WEBHOOK_URL;

/**
 * Sends text to the n8n webhook.
 * Expected responses (choose one in n8n):
 * 1) JSON: { audioBase64: "...", mimeType: "audio/mpeg" }
 * 2) Raw binary/mp3 with proper content-type
 */
export async function sendTextToTTS(payload) {
  const res = await fetch('http://localhost:5678/webhook/8c447714-b951-4963-af78-061807739431', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const contentType = res.headers.get('content-type') || '';

  if (!res.ok) throw new Error(await res.text());

  // Case 1: JSON with base64
  if (contentType.includes('application/json')) {
    const data = await res.json();
    if (!data.audioBase64) throw new Error('No audioBase64 in response');
    const blob = b64toBlob(data.audioBase64, data.mimeType || 'audio/mpeg');
    return URL.createObjectURL(blob);
  }

  // Case 2: binary stream
  const arrayBuf = await res.arrayBuffer();
  const blob = new Blob([arrayBuf], { type: contentType || 'audio/mpeg' });
  return URL.createObjectURL(blob);
}