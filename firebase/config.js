import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';

import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAqDmEUvby78C2no6tOaCP9b0xWci1ZxmM',
  authDomain: 'publik-52440.firebaseapp.com',
  projectId: 'publik-52440',
  storageBucket: 'publik-52440.appspot.com',
  messagingSenderId: '849101666310',
  appId: '1:849101666310:web:3d490ee6b89ec1293a2b87',
  measurementId: 'G-09PWTJ3W4T',
  // databaseURL: '<https://publik-52440.firebaseio.com>',
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);
export const storage = getStorage(app);
