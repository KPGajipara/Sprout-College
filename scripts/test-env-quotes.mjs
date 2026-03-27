console.log("PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("PRIVATE_KEY starts with quote:", process.env.FIREBASE_PRIVATE_KEY?.startsWith('"'));
console.log("PRIVATE_KEY ends with quote:", process.env.FIREBASE_PRIVATE_KEY?.endsWith('"'));
