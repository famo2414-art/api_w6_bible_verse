import { useState } from "react";

export default function SpecificVerse() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  async function fetchSpecific() {
    setLoading(true);
    setErr("");
    setVerse(null);
    try {
      const res = await fetch("/api/specific-verse");
      if (!res.ok) throw new Error("API request failed");
      const data = await res.json();
      setVerse(`${data.reference} — ${data.text}`);
    } catch (e) {
      console.error(e);
      setErr("Failed to load specific verse. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="verse-section">
      <h2>Specific Verse</h2>
      <button onClick={fetchSpecific} disabled={loading} aria-label="Get 
specific Bible verse">
        {loading ? "Loading..." : "Get Specific Verse (John 3:16)"}
      </button>
      {err && <p className="error">{err}</p>}
      {verse && <p className="verse-display">{verse}</p>}
    </section>
  );
}

