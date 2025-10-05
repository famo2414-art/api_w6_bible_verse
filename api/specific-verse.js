export default async function handler(req, res) {
  // Parse the book, chapter, and verse from the query parameters
  const { book = "John", chapter = "3", verse = "16" } = req.query;

  try {
    // Fetch from the public API
    const response = await fetch(
      
`https://labs.bible.org/api/?passage=${book}+${chapter}:${verse}&type=json&formatting=plain`
    );
    const data = await response.json();

    // Return a clean JSON response
    res.status(200).json({
      text: data[0]?.text || "No verse found.",
      reference: `${data[0]?.bookname} 
${data[0]?.chapter}:${data[0]?.verse}`,
    });
  } catch (error) {
    console.error("Error fetching specific verse:", error);
    res.status(500).json({ error: "Failed to fetch the specific verse." 
});
  }
}

