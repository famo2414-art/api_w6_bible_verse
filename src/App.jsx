import { useState } from 'react';
import RandomVerse from './components/RandomVerse.jsx';
import SpecificVerse from './components/SpecificVerse.jsx';

export default function App() {
  const [theme] = useState('#0f766e'); // Teal accent for buttons

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', background: '#0b1020', minHeight: '100vh', color: '#e5e7eb' }}>
      <header style={{ padding: '2rem 1rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Bible Verses Explorer</h1>
        <p style={{ marginTop: '.25rem', opacity: .9 }}>Random + Specific Verses via NET Bible API (React + Vite)</p>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '0 1rem 3rem', display: 'grid', gap: '1.25rem' }}>
        <RandomVerse accent={theme} />
        <SpecificVerse accent={theme} />
      </main>

      <footer style={{ textAlign: 'center', fontSize: '.875rem', opacity: .7, paddingBottom: '1.5rem' }}>
        Data from Bible.org Labs API (public). Proxy for dev CORS; O(1) fetch per call.
      </footer>
    </div>
  );
}
