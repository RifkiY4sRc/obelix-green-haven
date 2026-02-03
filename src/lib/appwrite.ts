import { Client, Databases } from 'appwrite';

const client = new Client()
  .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://sgp.cloud.appwrite.io/v1')
  .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID || '');

export const databases = new Databases(client);

export const config = {
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '',
  ratingsCollectionId: import.meta.env.VITE_APPWRITE_RATINGS_COLLECTION_ID || '',
  bugReportsCollectionId: import.meta.env.VITE_APPWRITE_BUG_REPORTS_COLLECTION_ID || '',
};
