import { useState } from 'react';

export default function SpecificVerse({ accent = '#2563eb' }) {
  const [ref, setRef] = useState('John 3:16');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function fetchSpecific() {
    setLoading(true);
    setErr('');
    setResult(null);
    try {
      const q = encodeURIComponent(ref.trim());
      const res = await fetch(`/bible/?passage=${q}&type=json&formatting=plain`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const verses = Array.isArray(data) ? data : [data];
      if (!verses.length || !verses[0].text) throw new Error('Invalid response format');
      setResult(verses.map(v => `${v.bookname} ${v.chapter}:${v.verse} — ${v.text.trim()}`).join(' '));
    } catch (e) {
      setErr('Failed to load verse. Use format like John 3:16 or Psalm 23:1-3 and retry.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={cardStyle}>
      <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Specific Verse</h2>
      <div style={{ display: 'flex', gap: '.5rem', margin: '.75rem 0' }}>
        <input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="e.g., John 3:16 or Psalm 23:1-3"
          style={inputStyle}
          aria-label="Bible verse reference"
        />
        <button onClick={fetchSpecific} disabled={loading} style={btnStyle(accent)}>
          {loading ? 'Loading...' : 'Get Verse'}
        </button>
      </div>
      <p style={{ lineHeight: 1.5, minHeight: '3.5rem' }}>
        {result ?? 'Enter a verse and click to fetch.'}
      </p>
      {err && <p style={{ color: '#fca5a5' }} role="alert">{err}</p>}
    </section>
  );
}

const cardStyle = {
  background: '#0f172a',
  border: '1px solid #1f2937',
  padding: '1rem',
  borderRadius: 12,
  boxShadow: '0 6px 18px rgba(0,0,0,.35)'
};
const inputStyle = {
  flex: 1,
  padding: '.55rem .7rem',
  borderRadius: 10,
  border: '1px solid #334155',
  background: '#0b1224',
  color: '#e2e8f0'
};
const btnStyle = (accent) => ({
  background: accent,
  color: 'white',
  border: 'none',
  padding: '.6rem 1rem',
  borderRadius: 10,
  cursor: 'pointer',
  fontSize: '.95rem'
});
