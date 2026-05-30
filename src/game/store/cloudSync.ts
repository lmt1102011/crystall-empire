import { useEffect, useRef, useState } from 'react';
import { firebaseConfig, firebaseConfigured } from '../../firebaseConfig';
import { hydrateGameSnapshot, makeGameSnapshot, useGameStore, type PersistedGameState } from './gameStore';

export type CloudStatus = 'local' | 'connecting' | 'synced' | 'saving' | 'offline';

export function useCloudSync() {
  const [status, setStatus] = useState<CloudStatus>(firebaseConfigured ? 'connecting' : 'local');
  const saveRef = useRef<null | ((snapshot: PersistedGameState) => Promise<void>)>(null);
  const cloudLoadedRef = useRef(false);
  const applyingCloudRef = useRef(false);

  useEffect(() => {
    let cancelled = false;

    async function connect() {
      if (!firebaseConfigured) {
        setStatus('local');
        return;
      }

      try {
        const [{ initializeApp, getApps }, { getAuth, signInAnonymously }, { getFirestore, doc, getDoc, setDoc, serverTimestamp }] =
          await Promise.all([import('firebase/app'), import('firebase/auth'), import('firebase/firestore')]);

        if (cancelled) return;
        const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
        const auth = getAuth(app);
        const credential = await signInAnonymously(auth);
        const database = getFirestore(app);
        const saveRefDoc = doc(database, 'users', credential.user.uid, 'state', 'game');
        const cloud = await getDoc(saveRefDoc);

        if (cancelled) return;
        if (cloud.exists()) {
          applyingCloudRef.current = true;
          hydrateGameSnapshot(cloud.data() as Partial<PersistedGameState>);
          window.setTimeout(() => {
            applyingCloudRef.current = false;
          }, 0);
        } else {
          await setDoc(saveRefDoc, { ...makeGameSnapshot(), cloudUpdatedAt: serverTimestamp() }, { merge: true });
        }

        saveRef.current = async (snapshot) => {
          await setDoc(saveRefDoc, { ...snapshot, cloudUpdatedAt: serverTimestamp() }, { merge: true });
        };
        cloudLoadedRef.current = true;
        setStatus('synced');
      } catch (error) {
        console.warn('Firebase cloud sync is offline; localStorage remains active.', error);
        setStatus('offline');
      }
    }

    void connect();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let timer: number | undefined;
    const unsubscribe = useGameStore.subscribe((state) => {
      if (!cloudLoadedRef.current || !saveRef.current || applyingCloudRef.current) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        setStatus('saving');
        saveRef.current?.(makeGameSnapshot(state)).then(
          () => setStatus('synced'),
          () => setStatus('offline'),
        );
      }, 900);
    });

    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return status;
}
