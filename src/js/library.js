import { refs } from './refs';
import { onSnapshot, doc } from 'firebase/firestore';
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
    console.log('user logged in: ', user);
    refs.authSignOut.parentElement.classList.remove('hidden');
    refs.authOpen.parentElement.classList.add('hidden');
    onWatched();
  } else {
    console.log('user logged out');
    refs.authSignOut.parentElement.classList.add('hidden');
    refs.authOpen.parentElement.classList.remove('hidden');
    refs.pagination.classList.add('visually-hidden');
  }
});

watchedBtn.addEventListener('click', onWatched);
queueBtn.addEventListener('click', onQueue);

async function onWatched() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }

  movieApi.resetPage();

  refs.movieList.innerHTML = '';
  watchedBtn.classList.add('library-btns__btn_current');
  queueBtn.classList.remove('library-btns__btn_current');

  paginationSettings.paginationType = 'watched';
  monitorWatchedChanges();
}

async function onQueue() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }

  movieApi.resetPage();

  refs.movieList.innerHTML = '';
  watchedBtn.classList.remove('library-btns__btn_current');
  queueBtn.classList.add('library-btns__btn_current');

  paginationSettings.paginationType = 'queue';
  monitorQueueChanges();
}

function monitorWatchedChanges() {
  onSnapshot(doc(db, 'users', auth.currentUser.uid), snapshot => {
    spinner.show();
    const { watchedMovies } = snapshot.data();

    paginationSettings.maxPages = Math.ceil(
      watchedMovies.length / paginationSettings.perPage
    );

    let paginatedResults = watchedMovies.filter((result, index) => {
      return (
        index < movieApi.page * paginationSettings.perPage &&
        index >=
          movieApi.page * paginationSettings.perPage -
            paginationSettings.perPage
      );
    });

    if (paginatedResults.length === 0) {
      console.log('empty');
      movieApi.page -= 1;
      paginatedResults = watchedMovies.filter((result, index) => {
        return (
          index < movieApi.page * paginationSettings.perPage &&
          index >=
            movieApi.page * paginationSettings.perPage -
              paginationSettings.perPage
        );
      });
    }

    console.log(paginatedResults);

    const markup = paginatedResults.map(cardLibraryTemplate).join('');
    refs.movieList.innerHTML = markup;
    initializePagination();
    spinner.close();
  });
}

function monitorQueueChanges() {
  onSnapshot(doc(db, 'users', auth.currentUser.uid), snapshot => {
    spinner.show();
    const { queuedMovies } = snapshot.data();

    paginationSettings.maxPages = Math.ceil(
      queuedMovies.length / paginationSettings.perPage
    );

    let paginatedResults = queuedMovies.filter((result, index) => {
      return (
        index < movieApi.page * paginationSettings.perPage &&
        index >=
          movieApi.page * paginationSettings.perPage -
            paginationSettings.perPage
      );
    });

    if (paginatedResults.length === 0) {
      console.log('empty');
      movieApi.page--;
      paginatedResults = queuedMovies.filter((result, index) => {
        return (
          index < movieApi.page * paginationSettings.perPage &&
          index >=
            movieApi.page * paginationSettings.perPage -
              paginationSettings.perPage
        );
      });
    }

    console.log(paginatedResults);

    const markup = paginatedResults.map(cardLibraryTemplate).join('');
    refs.movieList.innerHTML = markup;
    initializePagination();
    spinner.close();
  });
}
