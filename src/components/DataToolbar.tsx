import { Add, ArrowBack, Delete } from '@mui/icons-material';
import { Button, IconButton, Stack } from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { useDataContext } from '@/contexts/DataProvider';
import { updateCollection } from '@/lib/crud';

import CreateRowModal from './CreateRowModal';

export default function DataToolbar() {
  const { selectedRows, refetch, selectedCollection } = useDataContext();

  const [createRowModalOpen, setCreateRowModalOpen] = useState(false);

  const { mutation: deleteSelectedRows } = useMutation({
    mutationFn: () => {
      const newRows = selectedCollection?.values.filter(
        (row) => !selectedRows.includes(row.id),
      );

      if (selectedCollection) {
        return updateCollection(selectedCollection.id, { values: newRows });
      }

      return {};
    },
    onSuccess: () => refetch,
  });

  return (
    <>
      <Stack direction="row" p={2} justifyContent="space-between">
        <IconButton href="/" component="a">
          <ArrowBack />
        </IconButton>
        <Stack gap={1} direction="row">
          <Button
            onClick={() => setCreateRowModalOpen(true)}
            startDecorator={<Add />}
          >
            New Row
          </Button>
          <Button
            onClick={deleteSelectedRows}
            disabled={selectedRows.length === 0}
            color="danger"
            startDecorator={<Delete />}
          >
            Delete {selectedRows?.length ?? 0} Rows
          </Button>
        </Stack>
      </Stack>
      <CreateRowModal
        open={createRowModalOpen}
        setOpen={setCreateRowModalOpen}
      />
    </>
  );
}
