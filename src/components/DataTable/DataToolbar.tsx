import { useMutation } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

import ConfirmationModal from '@/components/Modals/ConfirmationModal';
import CreateRowModal from '@/components/Modals/CreateRowModal';
import { buttonVariants } from '@/components/ui/button';
import { useDataContext } from '@/contexts/DataProvider';
import { updateCollection } from '@/lib/crud';

export default function DataToolbar() {
  const { selectedRows, setSelectedRows, refetch, selectedCollection } =
    useDataContext();

  const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);

  const { mutate: deleteSelectedRows } = useMutation({
    mutationFn: () => {
      const newRows = selectedCollection?.values.filter(
        (row) => !selectedRows.includes(row.id),
      );

      if (selectedCollection) {
        return updateCollection(selectedCollection.id, { values: newRows });
      }

      return {};
    },
    onSuccess: () => {
      setConfirmDeleteModalOpen(false);
      setSelectedRows([]);
      refetch();
    },
  });

  return (
    <div className="flex gap-2 flex-row justify-between mb-4">
      <Link href="/" className={buttonVariants({ variant: 'outline' })}>
        <ArrowLeft />
      </Link>
      <div className="flex gap-1 flex-row">
        <CreateRowModal />
        {/* <Dropdown>
          <MenuButton
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
          >
            <MoreVert />
          </MenuButton>
          <Menu placement="bottom-end">
            <MenuItem>
              <ListItemDecorator>
                <Edit />
              </ListItemDecorator>
              Edit Collection
            </MenuItem>
            <ListDivider />
            <MenuItem
              disabled={selectedRows.length === 0}
              onClick={() => setConfirmDeleteModalOpen(true)}
            >
              <ListItemDecorator>
                <Delete />
              </ListItemDecorator>
              Delete {selectedRows?.length ?? 0} Rows
            </MenuItem>
          </Menu>
        </Dropdown> */}
      </div>
      {/* <CreateRowModal
        open={createRowModalOpen}
        setOpen={setCreateRowModalOpen}
      />
      <ConfirmationModal
        title={`Are you sure you want to delete ${selectedRows.length} items?`}
        message="The selected items will be deleted from your collection. This action cannot be undone."
        open={confirmDeleteModalOpen}
        handleClose={() => setConfirmDeleteModalOpen(false)}
        handleConfirm={deleteSelectedRows}
      /> */}
    </div>
  );
}
