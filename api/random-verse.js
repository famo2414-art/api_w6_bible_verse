export default async function handler(req, res) {
  try {
    const response = await 
fetch("https://labs.bible.org/api/?passage=random&type=json");
    const data = await response.json();

    res.status(200).json({
      verse: data[0]?.text,
      bookname: data[0]?.bookname,
      chapter: data[0]?.chapter,
      verseNum: data[0]?.verse,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch Bible verse" });
  }
}

