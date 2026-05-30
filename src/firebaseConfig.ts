export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyBCX0VXPZriSAlmYC8LwsDQwnc9y79dyX4',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'crystal-d0f53.firebaseapp.com',
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || 'https://crystal-d0f53-default-rtdb.firebaseio.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'crystal-d0f53',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'crystal-d0f53.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '382664733769',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:382664733769:web:36437170d58bacf24f3b98',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-41B3N37T4L',
};

export const firebaseConfigured = Object.values(firebaseConfig).every(Boolean);
