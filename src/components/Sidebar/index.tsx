import { Add } from '@mui/icons-material';
import { Box, Divider, IconButton, List, Sheet } from '@mui/joy';
import { useMemo, useState } from 'react';

import { useDataContext } from '@/contexts/DataProvider';

import NewCollectionModal from './NewCollectionModal';
import SidebarListItem from './SidebarListItem';

export default function Sidebar() {
  const { collections } = useDataContext();

  const [modalOpen, setModalOpen] = useState(false);

  const sidebarItems = useMemo(() => {
    const sidebarItemsArr: { [key: string]: string } = {};

    if (collections) {
      collections.forEach((collection) => {
        sidebarItemsArr[collection.name] = collection.id;
      });
    }

    return sidebarItemsArr;
  }, [collections]);

  return (
    <>
      <Sheet variant="outlined">
        <Box p={1}>
          <IconButton onClick={() => setModalOpen(true)}>
            <Add />
          </IconButton>
        </Box>
        <Divider />
        <List>
          {Object.keys(sidebarItems).map((key) => (
            <SidebarListItem
              key={key}
              label={key}
              collectionId={sidebarItems[key]}
            />
          ))}
        </List>
      </Sheet>
      <NewCollectionModal open={modalOpen} setOpen={setModalOpen} />
    </>
  );
}
