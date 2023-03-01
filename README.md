# Stems-Fullstack-Take-Home

## Quick Start

### Start Go Service

The Go service is served at `localhost:8080` by default

```
cd service
go build
go run .
```

### Start React FrontEnd

The web app is served at `localhost:3000` by default

```
cd frontend
npm install
npm start
```

## Assumptions

- Search matches for all text that starts with the current query (case-insensitive)
- All characters are allowed in the search (although they won't return any results if unmatched)
- Empty string is not allowed

## Additional Features If Possible

1. Optimize backend search algorithm using a trie to search by prefix
2. Additional descriptions for each search suggestion (e.g: Which state the city is in, genre of the artist)
3. Caching for search results on the frontend (store results in window.localStorage per query with cache expiry)
