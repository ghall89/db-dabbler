import { Add, MoreVert } from '@mui/icons-material';
import {
  Box,
  Divider,
  Dropdown,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
  Sheet,
} from '@mui/joy';
import { useMemo, useState } from 'react';

import { useDataContext } from '@/contexts/DataContext';

import NewCollectionModal from './NewCollectionModal';
import SidebarListItem from './SidebarListItem';

export default function Sidebar() {
  const { data, selectedCollectionId, setSelectedCollectionId } =
    useDataContext();

  const [modalOpen, setModalOpen] = useState(false);

  const sidebarItems = useMemo(() => {
    const sidebarItemsArr: { [key: string]: string } = {};

    if (data) {
      data.forEach((collection) => {
        sidebarItemsArr[collection.name] = collection.id;
      });
    }

    return sidebarItemsArr;
  }, [data]);

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
