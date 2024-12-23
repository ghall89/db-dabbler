import { Button, Stack } from '@mui/joy';
import { useState } from 'react';

import { useDataContext } from '@/contexts/DataContext';

import CreateRowModal from './CreateRowModal';

export default function DataToolbar() {
  const { selectedRows } = useDataContext();

  const [createRowModalOpen, setCreateRowModalOpen] = useState(false);

  return (
    <>
      <Stack direction="row" p={2} gap={1}>
        <Button onClick={() => setCreateRowModalOpen(true)}>New Row</Button>
        <Button
          onClick={() => console.log('DELETE')}
          disabled={selectedRows.length === 0}
        >
          Delete {selectedRows?.length ?? 0} Rows
        </Button>
      </Stack>
      <CreateRowModal
        open={createRowModalOpen}
        setOpen={setCreateRowModalOpen}
      />
    </>
  );
}
