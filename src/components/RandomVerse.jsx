import { useState } from "react";

const RandomVerse = () => {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRandomVerse = async () => {
    setLoading(true);
    setError(null);
    try {
      // Call your own serverless endpoint instead of Bible.org directly
      const response = await fetch("/api/random-verse");
      if (!response.ok) throw new Error("Failed to fetch");
      const data = await response.json();
      setVerse({
        text: data.verse,
        reference: `${data.bookname} ${data.chapter}:${data.verseNum}`,
      });
    } catch (err) {
      setError(err.message || "Error fetching verse");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="verse-section">
      <h2>Random Verse</h2>
      <button onClick={fetchRandomVerse} disabled={loading}>
        {loading ? "Loading..." : "Get Random Verse"}
      </button>
      {error && <p className="error">{error}</p>}
      {verse && (
        <div className="verse-display">
          <p>{verse.text}</p>
          <small>{verse.reference}</small>
        </div>
      )}
    </section>
  );
};

export default RandomVerse;

