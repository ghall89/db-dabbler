import { ChangeEvent } from 'react';

import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type CollectionField } from '@/lib/db';

interface FieldInputProps {
  field: CollectionField;
  value: any;
  handleChange: (field: string, value: any) => void;
}

export default function FieldInput({
  field,
  value,
  handleChange,
}: FieldInputProps) {
  function onChangeHandler(
    event: ChangeEvent<HTMLInputElement | HTMLButtonElement>,
  ) {
    handleChange(field.id, event.target.value);
  }

  switch (field.type) {
    case 'text':
      return (
        <>
          <Label htmlFor={field.id}>{field.name}</Label>
          <Input
            id={field.id}
            placeholder="Text"
            value={value}
            onChange={onChangeHandler}
          />
        </>
      );
    case 'number':
      return (
        <>
          <Label htmlFor={field.id}>{field.name}</Label>
          <Input
            id={field.id}
            placeholder="0"
            type="number"
            value={value}
            onChange={onChangeHandler}
          />
        </>
      );
    case 'boolean':
      return (
        <>
          <Checkbox id={field.id} value={value} onChange={onChangeHandler} />
          <Label className="ml-3" htmlFor={field.id}>
            {field.name}
          </Label>
        </>
      );
  }
}
