import { SearchForm } from '@/components/search-form';
import { SearchResults } from '@/components/search-results';

export default function SearchPage({ searchParams }: { searchParams: { q: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Search Results</h1>
      <SearchForm />
      <SearchResults query={searchParams.q} />
    </div>
  );
}