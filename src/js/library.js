import { refs } from './refs';
import { getDoc, doc } from 'firebase/firestore';
import { paginationSettings } from './pagination';
import { movieApi } from './Api';
import { cardLibraryTemplate } from './cardTemplate';
import { initializePagination } from './pagination';
import Notiflix from 'notiflix';
import { spinner } from './preloader';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './auth';

const watchedBtn = document.querySelector('[data-watched]');
const queueBtn = document.querySelector('[data-queue]');

onAuthStateChanged(auth, user => {
  if (user) {
    // docRef = doc(db, 'users', `${user.uid}`);
    console.log('user logged in: ', user);
    refs.authSignOut.parentElement.classList.remove('hidden');
    refs.authOpen.parentElement.classList.add('hidden');
    onWatchedClick();
  } else {
    console.log('user logged out');
    refs.authSignOut.parentElement.classList.add('hidden');
    refs.authOpen.parentElement.classList.remove('hidden');
    refs.pagination.classList.add('visually-hidden');
  }
});

watchedBtn.addEventListener('click', onWatchedClick);
queueBtn.addEventListener('click', onQueueClick);

async function onWatchedClick() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }

  spinner.show();

  movieApi.resetPage();

  refs.movieList.innerHTML = '';
  watchedBtn.classList.add('library-btns__btn_current');
  queueBtn.classList.remove('library-btns__btn_current');

  const { watchedMovies } = await getDoc(
    doc(db, 'users', auth.currentUser.uid)
  ).then(res => {
    return res.data();
  });

  paginationSettings.paginationType = 'watched';
  paginationSettings.maxPages = Math.ceil(
    watchedMovies.length / paginationSettings.perPage
  );

  console.log('watched movies: ', watchedMovies);
  console.log(paginationSettings.maxPages);
  initializePagination();

  const paginatedResults = watchedMovies.filter((result, index) => {
    return index < movieApi.page * paginationSettings.perPage;
  });
  // console.log('paginated results: ', paginatedResults);
  const markup = paginatedResults.map(cardLibraryTemplate).join('');
  refs.movieList.innerHTML = markup;
  spinner.close();
}

async function onQueueClick() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }

  spinner.show();

  movieApi.resetPage();

  refs.movieList.innerHTML = '';
  watchedBtn.classList.remove('library-btns__btn_current');
  queueBtn.classList.add('library-btns__btn_current');

  const { queuedMovies } = await getDoc(
    doc(db, 'users', auth.currentUser.uid)
  ).then(res => {
    return res.data();
  });

  paginationSettings.paginationType = 'queue';
  paginationSettings.maxPages = Math.ceil(
    queuedMovies.length / paginationSettings.perPage
  );

  console.log('queue movies: ', queuedMovies);
  console.log(paginationSettings.maxPages);
  initializePagination();
  const paginatedResults = queuedMovies.filter((result, index) => {
    return index < movieApi.page * paginationSettings.perPage;
  });
  // console.log('paginated results: ', paginatedResults);
  const markup = paginatedResults.map(cardLibraryTemplate).join('');
  refs.movieList.innerHTML = markup;

  spinner.close();
}
