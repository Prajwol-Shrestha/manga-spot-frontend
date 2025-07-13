import Typography from '@/components/ui/Typography';
import BookmarkList from './BookmarkList';

export default function BookmarksPage() {


  return (
    <main className="page-container flex flex-1 flex-col">
      <Typography variant="h5" className="mb-6 font-bold">
        Your Bookmarks
      </Typography>
      <BookmarkList />
    </main>
  );
}
