import { Add } from '@mui/icons-material';
import { Box, Button, Grid, Stack } from '@mui/joy';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import NewCollectionModal from '@/components/Modals/NewCollectionModal';
import { getCollections } from '@/lib/crud';

export default function Home() {
  const [openModal, setOpenModal] = useState(false);

  const { data, refetch } = useQuery({
    queryFn: () => getCollections(),
    queryKey: ['collection-items'],
    initialData: [],
  });

  return (
    <Box>
      <Stack direction="row" p={2} gap={1}>
        <Button onClick={() => setOpenModal(true)} startDecorator={<Add />}>
          New Collection
        </Button>
      </Stack>
      <Grid container spacing={2} p={2}>
        {data.map((collection) => (
          <Grid key={collection.id} xs={12} sm={6} md={4} lg={3}>
            <Button
              variant="outlined"
              component="a"
              href={`/collections/${collection.slug}`}
              fullWidth
              sx={{
                aspectRatio: '2/1',
              }}
            >
              {collection.name}
            </Button>
          </Grid>
        ))}
      </Grid>
      <NewCollectionModal
        open={openModal}
        setOpen={setOpenModal}
        refetch={refetch}
      />
    </Box>
  );
}
