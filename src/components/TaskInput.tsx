import { Add } from '@mui/icons-material';
import { Box, Divider, IconButton, Input, Stack } from '@mui/joy';
import { ChangeEvent, FormEvent, useState } from 'react';

import { addTask } from '@/utils/tasks';

export default function TaskInput() {
  const [formState, setFormState] = useState<string>('');

  const handleFormChange = (event: ChangeEvent<HTMLInputElement>) =>
    setFormState(event.target.value);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addTask(formState, setFormState);
  }

  return (
    <Box
      sx={{
        position: 'fixed',
        bottom: 0,
        background: 'white',
        marginLeft: -1,
        width: '100vw',
      }}
    >
      <Divider />
      <form action="submit" onSubmit={handleSubmit}>
        <Stack flexDirection="row" gap={1} sx={{ padding: 2 }}>
          <Input
            fullWidth
            type="text"
            value={formState}
            onChange={handleFormChange}
          />
          <IconButton
            disabled={formState === ''}
            variant="solid"
            color="primary"
            type="submit"
          >
            <Add />
          </IconButton>
        </Stack>
      </form>
    </Box>
  );
}
