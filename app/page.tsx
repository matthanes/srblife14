import { Author } from '@/types';
import { directus } from '@/utils/directus';

const {authors} = await directus.query<{ authors: Partial<Author>[] }>(`
  query {
    authors {
      name
      bio
      profile_pic {
        filename_disk
        description
      }
    }
  }
`);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        {`Author's Name is ${
          authors && authors[0]
            ? authors[0].name
            : 'No authors found'
        }`}
      </div>
    </main>
  );
}
