import Dexie, { EntityTable } from 'dexie';

interface Task {
  id: string;
  createdDt: Date;
  dueDt?: Date;
  text: string;
  isComplete: boolean;
}

const db = new Dexie('Tasks') as Dexie & {
  tasks: EntityTable<Task, 'id'>;
};

db.version(1).stores({
  tasks: '++id, createdDt, dueDt, text, isComplete',
});

export type { Task };
export { db };
