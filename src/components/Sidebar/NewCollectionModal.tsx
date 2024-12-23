import { Cancel } from '@mui/icons-material';
import {
  Button,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  List,
  ListItem,
  Modal,
  ModalDialog,
  Option,
  Select,
  Stack,
} from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import cuid from 'cuid';
import { useState } from 'react';

import { useDataContext } from '@/contexts/DataContext';

import { createCollection } from '@/utils/crud';
import { Collection, CollectionField } from '@/utils/db';

interface NewCollectionModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function NewCollectionModal({
  open,
  setOpen,
}: NewCollectionModalProps) {
  const { refetch } = useDataContext();

  const [collectionName, setCollectionName] = useState('New Collection');
  const [collectionFields, setCollectionFields] = useState<CollectionField[]>([
    {
      id: cuid(),
      name: 'Field 1',
      type: 'text',
    },
  ]);

  function handleClose() {
    setOpen(false);
    setCollectionName('');
    setCollectionFields([
      {
        id: cuid(),
        name: 'Field 1',
        type: 'text',
      },
    ]);
  }

  const { mutate } = useMutation({
    mutationFn: () => {
      const newCollection: Collection = {
        id: cuid(),
        name: collectionName,
        createdDt: new Date(),
        fields: collectionFields,
        values: [],
      };

      return createCollection(newCollection);
    },
    onSuccess: () => {
      handleClose();
      refetch();
    },
  });

  function addField() {
    const newField: CollectionField = {
      id: cuid(),
      name: `Field ${collectionFields.length + 1}`,
      type: 'text',
    };

    setCollectionFields([...collectionFields, newField]);
  }

  function removeField(index: number) {
    const updatedFields = collectionFields.filter((_, i) => i !== index);

    setCollectionFields(updatedFields);
  }

  function handleUpdateField(
    index: number,
    field: 'name' | 'type',
    value: any,
  ) {
    const updatedFields = [...collectionFields];
    updatedFields[index] = { ...updatedFields[index], [field]: value };

    setCollectionFields(updatedFields);
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog>
        <DialogTitle>Create a New Collection</DialogTitle>
        <DialogContent>Fill in the information of the project.</DialogContent>
        <Stack spacing={2}>
          <FormControl>
            <FormLabel>Collection Name</FormLabel>
            <Input
              value={collectionName}
              onChange={(event) => setCollectionName(event.target.value)}
              required
            />
          </FormControl>
          <List size="sm" variant="outlined" sx={{ borderRadius: 6 }}>
            {collectionFields.map((field, index) => (
              <ListItem key={field.id}>
                <IconButton
                  onClick={() => removeField(index)}
                  disabled={collectionFields.length <= 1}
                >
                  <Cancel />
                </IconButton>
                <Input
                  sx={{ width: 160 }}
                  size="sm"
                  value={collectionFields[index].name}
                  onChange={(event) =>
                    handleUpdateField(index, 'name', event.target.value)
                  }
                />
                <Select
                  sx={{
                    width: 100,
                  }}
                  defaultValue="dog"
                  size="sm"
                  value={collectionFields[index].type}
                  onChange={(_, value) =>
                    handleUpdateField(index, 'type', value)
                  }
                >
                  <Option value="text">Text</Option>
                  <Option value="number">Number</Option>
                  <Option value="boolean">Boolean</Option>
                </Select>
              </ListItem>
            ))}
          </List>
          <Button variant="outlined" onClick={addField}>
            Add Field
          </Button>
          <Button
            disabled={collectionName === '' || collectionFields.length < 1}
            onClick={() => mutate()}
          >
            Create
          </Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
