import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBDfRX3CrAdv57TIA9XczF0Iu-0rh_WAfg",
  authDomain: "prosolve-social-marketing.firebaseapp.com",
  databaseURL: "https://prosolve-social-marketing-default-rtdb.firebaseio.com",
  projectId: "prosolve-social-marketing",
  storageBucket: "prosolve-social-marketing.firebasestorage.app",
  messagingSenderId: "376808913587",
  appId: "1:376808913587:web:c53f1e8fe84d8eaf6acec6",
  measurementId: "G-B35680FNJ3"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database, ref, onValue };
