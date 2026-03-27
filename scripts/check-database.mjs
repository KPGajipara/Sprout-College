import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const app = initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
});

const db = getFirestore(app);

try {
  console.log("Project ID:", projectId);
  // @ts-ignore
  console.log("Database path:", db._databaseId ? `${db._databaseId.projectId}/${db._databaseId.database}` : "unknown");
  
  const collections = await db.listCollections();
  console.log("Collections:", collections.map(c => c.id));
} catch (error) {
  console.error("Error:");
  console.error(error);
}
