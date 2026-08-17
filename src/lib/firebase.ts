import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { isSupported, getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? "",
};

const isFirebaseDisabled = process.env.NEXT_PUBLIC_FIREBASE_DISABLED === "true";
const hasRequiredConfig = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.storageBucket,
  firebaseConfig.messagingSenderId,
  firebaseConfig.appId,
].every(Boolean);
export const isFirebaseConfigured = !isFirebaseDisabled && hasRequiredConfig;

let authInstance: Auth | null = null;
let firestoreDb: Firestore | null = null;
let googleProviderInstance: GoogleAuthProvider | null = null;
let analyticsInstance: Analytics | null = null;

if (isFirebaseConfigured) {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  firestoreDb = getFirestore(app);
  googleProviderInstance = new GoogleAuthProvider();

  if (typeof window !== "undefined" && firebaseConfig.measurementId) {
    isSupported().then((supported) => {
      if (supported) analyticsInstance = getAnalytics(app);
    });
  }
}

export {
  authInstance as auth,
  firestoreDb as db,
  googleProviderInstance as googleProvider,
  analyticsInstance as analytics,
};
