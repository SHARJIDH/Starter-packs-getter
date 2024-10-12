import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const response = await fetch('https://api.github.com/search/repositories?q=topic:starter-pack&sort=stars&order=desc&per_page=10', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${process.env.GITHUB_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch starter packs');
    }

    const data = await response.json();
    const starterPacks = data.items.map((item: any) => ({
      name: item.name,
      description: item.description,
      stars: item.stargazers_count,
      url: item.html_url
    }));

    return NextResponse.json(starterPacks);
  } catch (error) {
    console.error('Error fetching starter packs:', error);
    return NextResponse.json({ error: 'Failed to fetch starter packs' }, { status: 500 });
  }
}