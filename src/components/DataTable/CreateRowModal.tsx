import {
  Checkbox,
  DialogTitle,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalDialog,
  Stack,
} from '@mui/joy';

import { useDataContext } from '@/contexts/DataContext';

import { type CollectionField } from '@/utils/db';

interface FieldInputProps {
  field: CollectionField;
}

function FieldInput({ field }: FieldInputProps) {
  switch (field.type) {
    case 'text':
      return (
        <FormControl>
          <FormLabel>{field.name}</FormLabel>
          <Input />
        </FormControl>
      );
    case 'number':
      return (
        <FormControl>
          <FormLabel>{field.name}</FormLabel>
          <Input type="number" />
        </FormControl>
      );
    case 'boolean':
      return <Checkbox label={field.name} />;
  }
}

interface CreateRowModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function CreateRowModal({ open, setOpen }: CreateRowModalProps) {
  const { selectedCollection } = useDataContext();

  return (
    <Modal
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <ModalDialog>
        <DialogTitle>New Row</DialogTitle>
        <Stack spacing={2}>
          {selectedCollection?.fields.map((field) => (
            <FieldInput key={field.id} field={field} />
          ))}
        </Stack>
      </ModalDialog>
    </Modal>
  );
}
