import { useMutation } from '@tanstack/react-query';
import cuid from 'cuid';
import { CircleX, Plus } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createCollection } from '@/lib/crud';
import { Collection, CollectionField } from '@/lib/db';
import { generateSlug } from '@/utils/formatters';

interface NewCollectionModalProps {
  refetch: () => void;
}

export default function NewCollectionModal({
  refetch,
}: NewCollectionModalProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [collectionName, setCollectionName] = useState('New Collection');
  const [collectionFields, setCollectionFields] = useState<CollectionField[]>([
    {
      id: cuid(),
      name: 'Field 1',
      type: 'text',
    },
  ]);

  function handleClose() {
    setCollectionName('New Collection');
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
        slug: generateSlug(collectionName),
        createdDt: new Date(),
        fields: collectionFields,
        values: [],
      };

      return createCollection(newCollection);
    },
    onSuccess: () => {
      setModalOpen(false);
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
    <Dialog onOpenChange={handleClose}>
      <DialogTrigger>
        <Button>
          <Plus />
          New Collection
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a New Collection</DialogTitle>
          <DialogDescription>
            Fill in the information for your collection.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Input
            id="collection-name"
            onChange={(event) => setCollectionName(event.target.value)}
            value={collectionName}
            className="col-span-3"
          />
        </div>
        <div className="overflow-scroll h-[30vh] border-[1px] pl-2 pr-4 rounded-sm">
          {collectionFields.map((field, index) => (
            <div className="flex flex-row gap-2 my-2" key={field.id}>
              <Button
                onClick={() => removeField(index)}
                variant="link"
                disabled={collectionFields.length === 1}
              >
                <CircleX />
              </Button>
              <Input
                value={collectionFields[index].name}
                onChange={(event) =>
                  handleUpdateField(index, 'name', event.target.value)
                }
              />
              <Select
                onChange={(value) => {
                  handleUpdateField(index, 'type', value);
                }}
                defaultValue={field.type}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a verified email to display" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="text">Text</SelectItem>
                  <SelectItem value="number">Number</SelectItem>
                  <SelectItem value="boolean">Boolean</SelectItem>
                </SelectContent>
              </Select>
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={addField}>
          Add Field
        </Button>
        <Button
          disabled={collectionName === '' || collectionFields.length < 1}
          onClick={() => mutate()}
        >
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
}
