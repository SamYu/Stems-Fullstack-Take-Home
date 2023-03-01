import { useEffect, useMemo, useState } from "react";
import { debounce } from "@mui/material/utils";

export default function useSearchBox() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<readonly string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedFetch = useMemo(
    () =>
      debounce(async (query: string) => {
        const response = await fetch(
          "http://localhost:8080/search?" +
            new URLSearchParams({
              query,
            })
        );
        const jsonResponse = await response.json();
        if (jsonResponse.data) {
          setResults([...jsonResponse.data]);
        } else if (jsonResponse.message) {
          setResults([]);
        }
        setIsLoading(false);
      }, 400),
    []
  );

  useEffect(() => {
    setIsLoading(true);
    debouncedFetch(query);
  }, [query, debouncedFetch]);

  return { results, setQuery, isLoading };
}
