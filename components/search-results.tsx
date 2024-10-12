"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StarterPack {
  name: string;
  description: string;
  stars: number;
  url: string;
}

export function SearchResults({ query }: { query: string }) {
  const [results, setResults] = useState<StarterPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [query]);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (results.length === 0) {
    return <div className="text-center">No results found for "{query}"</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {results.map((pack) => (
        <Card key={pack.name}>
          <CardHeader>
            <CardTitle>{pack.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{pack.description}</p>
            <div className="flex justify-between items-center">
              <Badge variant="secondary">{pack.stars} stars</Badge>
              <a href={pack.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                View on GitHub
              </a>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}