import Dexie, { EntityTable } from 'dexie';
import { dexieCloud } from 'dexie-cloud-addon';

export interface CollectionField {
  id: string;
  name: string;
  type: 'text' | 'number' | 'date' | 'boolean';
}

export interface CollectionValue {
  id: string;
  [key: string]: string | number | Date | boolean;
}

export interface Collection {
  id: string;
  createdDt: Date;
  name: string;
  slug: string;
  fields: CollectionField[];
  values: CollectionValue[];
}

const db = new Dexie('Collections', { addons: [dexieCloud] }) as Dexie & {
  collections: EntityTable<Collection, 'id'>;
};

db.version(1).stores({
  collections: '&id, createdDt, &name, &slug, fields, values',
});

db.cloud.configure({
  databaseUrl: process.env.DEXIE_CLOUD_URL ?? '',
  requireAuth: true,
});

export { db };
