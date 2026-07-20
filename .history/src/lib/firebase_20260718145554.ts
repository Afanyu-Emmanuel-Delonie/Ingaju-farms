import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
};

const isFirebaseDisabled = process.env.NEXT_PUBLIC_FIREBASE_DISABLED === "true";
const hasRequiredConfig = Object.values(firebaseConfig).every(Boolean);
export const isFirebaseConfigured = !isFirebaseDisabled && hasRequiredConfig;

let authInstance: Auth | null = null;
let firestoreDb: Firestore | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;

if (isFirebaseConfigured) {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  firestoreDb = getFirestore(app);
  googleProviderInstance = new GoogleAuthProvider();
}

export {
  authInstance as auth,
  firestoreDb as db,
  googleProviderInstance as googleProvider,
};
