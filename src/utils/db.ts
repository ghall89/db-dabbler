import Dexie, { EntityTable } from 'dexie';

interface CollectionField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean';
}

interface Collection {
  id: string;
  createdDt: Date;
  name: string;
  fields: CollectionField[];
  values: Record<string, string | number | boolean>[];
}

const db = new Dexie('Collections') as Dexie & {
  collections: EntityTable<Collection, 'id'>;
};

db.version(1).stores({
  collections: '++id, createdDt, name, fields, values',
});

export type { CollectionField, Collection };
export { db };
