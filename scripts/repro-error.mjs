import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!projectId) {
  console.error("FIREBASE_PROJECT_ID is missing");
  process.exit(1);
}

const app = initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
});

const db = getFirestore(app);

try {
  console.log("Attempting to get config/admin document...");
  const snap = await db.collection("config").doc("admin").get();
  console.log("Exists:", snap.exists);
} catch (error) {
  console.error("Caught error:");
  console.error(error);
}
