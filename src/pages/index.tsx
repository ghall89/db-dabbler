import { useQuery } from '@tanstack/react-query';

import CollectionCard from '@/components/CollectionCard';
import NewCollectionModal from '@/components/Modals/NewCollectionModal';
import { getCollections } from '@/lib/crud';

export default function Home() {
  const { data, refetch } = useQuery({
    queryFn: () => getCollections(),
    queryKey: ['collection-items'],
    initialData: [],
  });

  return (
    <div>
      <div className="flex-row p-4">
        <NewCollectionModal refetch={refetch} />
      </div>
      <div className="grid grid-cols-5 gap-4 p-4">
        {data.map((collection) => (
          <CollectionCard
            key={collection.id}
            collectionName={collection.name}
            slug={collection.slug}
          />
        ))}
      </div>
    </div>
  );
}
