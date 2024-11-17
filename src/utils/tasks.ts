import cuid from 'cuid';

import { db } from './db';

export async function addTask(
  formState: string,
  setFormState: (s: string) => void,
) {
  try {
    const id = await db.tasks.add({
      id: cuid(),
      createdDt: new Date(),
      text: formState,
      isComplete: false,
    });

    setFormState('');
  } catch (error) {
    console.error(error);
  }
}

export async function toggleComplete(id: string, isComplete: boolean) {
  try {
    await db.tasks.update(id, { isComplete });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteTask(id: string) {
  try {
    await db.tasks.delete(id);
  } catch (error) {
    console.error(error);
  }
}
