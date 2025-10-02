import { useState } from 'react';

export default function RandomVerse({ accent = '#2563eb' }) {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  async function fetchRandom() {
    setLoading(true); setErr(''); setVerse(null);
    try {
      const res = await fetch(`/bible/?passage=random&type=json&formatting=plain`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const v = Array.isArray(data) ? data[0] : data;
      if (!v || !v.text) throw new Error('Invalid response format');
      setVerse(`${v.bookname} ${v.chapter}:${v.verse} — ${v.text.trim()}`);
    } catch (e) {
      setErr('Failed to load random verse. Check connection and retry.');
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={cardStyle}>
      <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Random Verse</h2>
      <p style={{ marginTop: '.5rem', minHeight: '3.5rem', lineHeight: 1.5 }}>
        {verse ?? 'Click to fetch a random verse.'}
      </p>
      {err && <p style={{ color: '#fca5a5' }} role="alert">{err}</p>}
      <button onClick={fetchRandom} disabled={loading} style={btnStyle(accent)} aria-label="Fetch random Bible verse">
        {loading ? 'Loading...' : 'Get Random Verse'}
      </button>
    </section>
  );
}

const cardStyle = {
  background: '#0f172a', border: '1px solid #1f2937', padding: '1rem',
  borderRadius: 12, boxShadow: '0 6px 18px rgba(0,0,0,.35)'
};
const btnStyle = (accent) => ({
  background: accent, color: 'white', border: 'none', padding: '.6rem 1rem',
  borderRadius: 10, cursor: 'pointer', fontSize: '.95rem'
});
