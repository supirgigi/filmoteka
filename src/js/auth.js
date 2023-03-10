import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { refs } from './refs';
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import Notiflix from 'notiflix';

const firebaseConfig = {
  apiKey: 'AIzaSyAEEIQrC1FklTDIB6wSl3Lj1Ay7wmlBG7E',
  authDomain: 'filmoteka-df132.firebaseapp.com',
  projectId: 'filmoteka-df132',
  storageBucket: 'filmoteka-df132.appspot.com',
  messagingSenderId: '615822401764',
  appId: '1:615822401764:web:92347d76b8e407932b8cf1',
  measurementId: 'G-CW2YT3SCBD',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
auth.useDeviceLanguage();
const provider = new GoogleAuthProvider();

refs.authLogin.addEventListener('click', loginEmailPassword);
refs.authRegister.addEventListener('click', createAccount);
refs.authSignOut.addEventListener('click', logout);
refs.authGoogle.addEventListener('click', onGoogleAuth);

async function onGoogleAuth() {
  try {
    signInWithRedirect(auth, provider);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

async function monitorRedirect() {
  const result = await getRedirectResult(auth);
  if (result) {
    const userData = await getDoc(doc(db, 'users', result.user.uid)).then(
      res => {
        return res.data();
      }
    );
    if (!userData) {
      console.log('new user');
      setDoc(doc(db, 'users', `${result.user.uid}`), {
        userId: result.user.uid,
        userEmail: result.user.email,
        watchedMovies: [],
        queuedMovies: [],
      });
    }
  }
}

async function loginEmailPassword(e) {
  e.preventDefault();

  const loginEmail = refs.authForm.elements.email.value;
  const loginPassword = refs.authForm.elements.password.value;

  if (!loginEmail || !loginPassword) {
    Notiflix.Notify.failure('Enter email and password');
    return;
  }

  try {
    await signInWithEmailAndPassword(auth, loginEmail, loginPassword).then(
      () => {
        refs.authModal.classList.add('is-hidden');
        refs.authForm.reset();
      }
    );
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

async function createAccount(e) {
  e.preventDefault();

  const email = refs.authForm.elements.email.value;
  const password = refs.authForm.elements.password.value;

  if (!email || !password) {
    Notiflix.Notify.failure('Enter email and password');
    return;
  }

  try {
    await createUserWithEmailAndPassword(auth, email, password).then(
      async cred => {
        await setDoc(doc(db, 'users', `${cred.user.uid}`), {
          userId: cred.user.uid,
          userEmail: cred.user.email,
          watchedMovies: [],
          queuedMovies: [],
        });
        refs.authModal.classList.add('is-hidden');
        refs.authForm.reset();
      }
    );
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

function logout(e) {
  e.preventDefault();
  signOut(auth).then(location.reload());
}

monitorRedirect();
