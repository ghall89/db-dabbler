import { useMutation } from '@tanstack/react-query';
import cuid from 'cuid';
import { Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useDataContext } from '@/contexts/DataProvider';
import { updateCollection } from '@/lib/crud';
import { type CollectionValue } from '@/lib/db';

import FieldInput from './FieldInput';

export default function CreateRowModal() {
  const { selectedCollection, refetch } = useDataContext();

  const [fieldValues, setFieldValues] = useState<{ [key: string]: any }>({});

  function handleChange(field: string, value: any) {
    setFieldValues((prevFieldValues) => ({
      ...prevFieldValues,
      [field]: value,
    }));
  }

  function handleClose() {
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
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger>
        <Button>
          <Plus />
          New Row
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Row</DialogTitle>
        </DialogHeader>
        {selectedCollection?.fields.map((field) => (
          <div
            key={field.id}
            className="grid-cols-2 w-full items-center gap-1.5"
          >
            <FieldInput
              field={field}
              value={fieldValues[field.name]}
              handleChange={handleChange}
            />
          </div>
        ))}
        <Button onClick={() => mutate()}>Save</Button>
      </DialogContent>
    </Dialog>
  );
}
