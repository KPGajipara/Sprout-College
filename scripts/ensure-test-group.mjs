#!/usr/bin/env node
/**
 * One-off: ensure a group with code TEST01 exists (for checklist).
 * Run: node --env-file=.env.local scripts/ensure-test-group.mjs
 */

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");
if (!projectId || !clientEmail || !privateKey) {
  console.error("Set FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY in .env.local");
  process.exit(1);
}

const { initializeApp, cert } = await import("firebase-admin/app");
const app = initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
const { getFirestore } = await import("firebase-admin/firestore");
const db = getFirestore(app);

const code = "TEST01";
const snap = await db.collection("groups").where("code", "==", code).where("is_active", "==", true).limit(1).get();
if (!snap.empty) {
  console.log("Group TEST01 already exists:", snap.docs[0].id);
  process.exit(0);
}

const { FieldValue } = await import("firebase-admin/firestore");
const ref = await db.collection("groups").add({
  name: "Checklist Test Group",
  code,
  is_active: true,
  created_at: FieldValue.serverTimestamp(),
});
console.log("Created group TEST01 with id:", ref.id);
process.exit(0);
