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

export function StarterPackList() {
  const [starterPacks, setStarterPacks] = useState<StarterPack[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarterPacks = async () => {
      try {
        const response = await fetch('/api/starter-packs');
        if (!response.ok) {
          throw new Error('Failed to fetch starter packs');
        }
        const data = await response.json();
        setStarterPacks(data);
      } catch (error) {
        console.error('Error fetching starter packs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarterPacks();
  }, []);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {starterPacks.map((pack) => (
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