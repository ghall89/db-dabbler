import { List, ListDivider } from '@mui/joy';
import { useLiveQuery } from 'dexie-react-hooks';
import { AnimatePresence, motion } from 'motion/react';
import { forwardRef, useMemo } from 'react';

import { db } from '@/utils/db';

import TaskListItem from './components/TaskListItem';

export default function TaskList() {
  const tasks = useLiveQuery(() => db?.tasks?.toArray() || []);

  return (
    <List>
      <AnimatePresence>
        {tasks?.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            layout
          >
            <TaskListItem item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </List>
  );
}
