import { db } from './db';
import { type Collection } from './db';

export async function getCollections(): Promise<Collection[]> {
  let collections: Collection[] = [];

  try {
    collections = await db.collections.toArray();
  } catch (error) {
    console.error(error);
  }

  return collections;
}

export async function createCollection(newCollection: Collection) {
  try {
    await db.collections.add(newCollection);
  } catch (error) {
    console.error(error);
  }
}

export async function updateCollection(
  collectionId: string,
  updatedCollection: { [key: string]: any },
) {
  try {
    await db.collections.update(collectionId, updatedCollection);
  } catch (error) {
    console.error(error);
  }
}

export async function deleteCollection(collectionId: string) {
  try {
    await db.collections.delete(collectionId);
  } catch (error) {
    console.error(error);
  }
}
