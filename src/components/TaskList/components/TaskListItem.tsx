import { Delete } from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemContent,
  ListItemDecorator,
} from '@mui/joy';
import { AnimatePresence, motion } from 'motion/react';
import { forwardRef } from 'react';

import { Task } from '@/utils/db';
import { deleteTask, toggleComplete } from '@/utils/tasks';

interface TaskListItemProps {
  item: Task;
}

export default function TaskListItem({ item }: TaskListItemProps) {
  return (
    <ListItem>
      <ListItemDecorator>
        <Checkbox
          checked={item.isComplete}
          onChange={() => toggleComplete(item.id, !item.isComplete)}
        />
      </ListItemDecorator>
      <ListItemContent
        sx={{
          textDecoration: item.isComplete ? 'line-through' : 'none',
        }}
      >
        {item.text}
      </ListItemContent>
      <IconButton onClick={() => deleteTask(item.id)}>
        <Delete color="error" />
      </IconButton>
    </ListItem>
  );
}
