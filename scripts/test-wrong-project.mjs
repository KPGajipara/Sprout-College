import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = "non-existent-project-12345";
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

const app = initializeApp({
  credential: cert({ projectId, clientEmail, privateKey }),
});

const db = getFirestore(app);

try {
  console.log("Attempting to get config/admin document from wrong project...");
  const snap = await db.collection("config").doc("admin").get();
  console.log("Exists:", snap.exists);
} catch (error) {
  console.error("Caught error:");
  console.error(error);
}
