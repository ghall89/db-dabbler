import { MoreVert } from '@mui/icons-material';
import {
  Dropdown,
  ListItem,
  ListItemButton,
  ListItemDecorator,
  Menu,
  MenuButton,
  MenuItem,
} from '@mui/joy';
import { useMutation } from '@tanstack/react-query';

import { useDataContext } from '@/contexts/DataProvider';
import { deleteCollection } from '@/lib/crud';

interface SidebarListItemProps {
  label: string;
  collectionId: string;
}

export default function SidebarListItem({
  label,
  collectionId,
}: SidebarListItemProps) {
  const { selectedCollectionId, setSelectedCollectionId, refetch } =
    useDataContext();

  const { mutate } = useMutation({
    mutationFn: () => deleteCollection(collectionId),
    onSuccess: () => refetch(),
  });

  return (
    <ListItem>
      <ListItemButton
        selected={selectedCollectionId === collectionId}
        onClick={() => setSelectedCollectionId(collectionId)}
      >
        {label}
      </ListItemButton>
      <ListItemDecorator>
        <Dropdown>
          <MenuButton variant="plain">
            <MoreVert />
          </MenuButton>
          <Menu>
            <MenuItem onClick={() => mutate()}>Delete</MenuItem>
          </Menu>
        </Dropdown>
      </ListItemDecorator>
    </ListItem>
  );
}
