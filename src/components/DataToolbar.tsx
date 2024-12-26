import { Add, ArrowBack, Delete, Edit, MoreVert } from '@mui/icons-material';
import {
  Button,
  Dropdown,
  IconButton,
  ListDivider,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Stack,
} from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

import { useDataContext } from '@/contexts/DataProvider';
import { updateCollection } from '@/lib/crud';

import ConfirmationModal from './Modals/ConfirmationModal';
import CreateRowModal from './Modals/CreateRowModal';

export default function DataToolbar() {
  const { selectedRows, setSelectedRows, refetch, selectedCollection } =
    useDataContext();

  const [createRowModalOpen, setCreateRowModalOpen] = useState(false);
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
          <Dropdown>
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
          </Dropdown>
        </Stack>
      </Stack>
      <CreateRowModal
        open={createRowModalOpen}
        setOpen={setCreateRowModalOpen}
      />
      <ConfirmationModal
        title={`Are you sure you want to delete ${selectedRows.length} items?`}
        message="The selected items will be deleted from your collection. This action cannot be undone."
        open={confirmDeleteModalOpen}
        handleClose={() => setConfirmDeleteModalOpen(false)}
        handleConfirm={deleteSelectedRows}
      />
    </>
  );
}
