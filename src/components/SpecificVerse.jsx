import { useEffect, useState } from "react";

export default function SpecificVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  useEffect(() => {
    async function fetchVerse() {
      try {
        const res = await fetch("/api/specific-verse");
        if (!res.ok) throw new Error("API request failed");
        const data = await res.json();
        setVerse(`${data.reference} — ${data.text}`);
      } catch (e) {
        console.error(e);
        setErr("Failed to load specific verse.");
      } finally {
        setLoading(false);
      }
    }

    fetchVerse();
  }, []);

  return (
    <section className="verse-section">
      <h2>Specific Verse (John 3:16)</h2>
      {loading && <p>Loading...</p>}
      {err && <p className="error">{err}</p>}
      {verse && <p className="verse-display">{verse}</p>}
    </section>
  );
}

