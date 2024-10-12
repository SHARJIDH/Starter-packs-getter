import { SearchForm } from '@/components/search-form';
import { StarterPackList } from '@/components/starter-pack-list';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">GitHub Starter Pack Scraper</h1>
      <SearchForm />
      <StarterPackList />
    </div>
  );
}