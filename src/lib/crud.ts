import { db } from './db';
import { type Collection } from './db';
import { generateSlug } from './utils';

export interface CollectionListItem {
  id: string;
  name: string;
  slug: string;
}

export async function getCollections(): Promise<CollectionListItem[]> {
  const collectionsList: CollectionListItem[] = [];

  try {
    const collections = await db.collections.toArray();
    collections.forEach(({ id, name, slug }) =>
      collectionsList.push({ id, name, slug }),
    );
  } catch (error) {
    console.error(error);
  }

  return collectionsList;
}

export async function getCollectionBySlug(
  slug: string,
): Promise<Collection | undefined> {
  try {
    const collection = await db.collections
      .where('slug')
      .equals(slug)
      .toArray();
    return collection[0];
  } catch (error) {
    console.error(error);
  }
}

export async function createCollection(newCollection: Collection) {
  try {
    const createObj = newCollection;
    createObj.slug = generateSlug(createObj.name);

    await db.collections.add(createObj);
  } catch (error) {
    console.error(error);
  }
}

export async function updateCollection(
  collectionId: string,
  updatedCollection: { [key: string]: any },
) {
  try {
    const updateObj = updatedCollection;
    if (updateObj?.name) {
      updateObj.slug = generateSlug(updateObj.name);
    }

    await db.collections.update(collectionId, updateObj);
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
