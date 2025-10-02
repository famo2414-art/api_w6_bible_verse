# CSC6210 Bible Verses React App

## Overview
React + Vite app fetching verses from [NET Bible API](https://labs.bible.org/api/). RandomVerse fetches on button click; SpecificVerse auto-loads John 3:16 and supports any verse/range (e.g., Psalm 23:1-3). Dark UI, O(1) fetch like CSC6210 hash lookups.

## Setup
```bash
npm create vite@latest bible-verses -- --template react
cd bible-verses
npm i
npm run dev
