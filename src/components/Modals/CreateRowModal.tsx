import {
  Button,
  Checkbox,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
} from '@mui/joy';
import { useMutation } from '@tanstack/react-query';
import cuid from 'cuid';
import { ChangeEvent, useState } from 'react';

import { useDataContext } from '@/contexts/DataProvider';
import { updateCollection } from '@/lib/crud';
import { type CollectionField, type CollectionValue } from '@/lib/db';

interface FieldInputProps {
  field: CollectionField;
  value: any;
  handleChange: (field: string, value: any) => void;
}

function FieldInput({ field, value, handleChange }: FieldInputProps) {
  function onChangeHandler(event: ChangeEvent<HTMLInputElement>) {
    handleChange(field.id, event.target.value);
  }

  switch (field.type) {
    case 'text':
      return (
        <FormControl>
          <FormLabel>{field.name}</FormLabel>
          <Input value={value} onChange={onChangeHandler} />
        </FormControl>
      );
    case 'number':
      return (
        <FormControl>
          <FormLabel>{field.name}</FormLabel>
          <Input value={value} onChange={onChangeHandler} type="number" />
        </FormControl>
      );
    case 'boolean':
      return (
        <Checkbox value={value} onChange={onChangeHandler} label={field.name} />
      );
  }
}

interface CreateRowModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateRowModal({ open, setOpen }: CreateRowModalProps) {
  const { selectedCollection, refetch } = useDataContext();

  const [fieldValues, setFieldValues] = useState<{ [key: string]: any }>({});

  function handleChange(field: string, value: any) {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [field]: value,
    }));
  }

  function handleClose() {
    setOpen(false);
    setFieldValues({});
  }

  const { mutate } = useMutation({
    mutationFn: () => {
      if (selectedCollection) {
        const newRows: CollectionValue[] = [
          ...selectedCollection.values,
          { id: cuid(), ...fieldValues },
        ];

        return updateCollection(selectedCollection.id, { values: newRows });
      }

      return {};
    },
    onSuccess: () => {
      handleClose();
      refetch();
    },
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog>
        <DialogTitle>New Row</DialogTitle>
        <Stack spacing={2}>
          {selectedCollection?.fields.map((field) => (
            <FieldInput
              key={field.id}
              field={field}
              value={fieldValues[field.name]}
              handleChange={handleChange}
            />
          ))}
          <Button onClick={() => mutate()}>Save</Button>
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
