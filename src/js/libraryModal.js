import { refs } from './refs';
import { movieApi } from './Api';
import { dataFormat } from './dataFormat';
import { auth, db } from './auth';
import {
  cardLibraryTemplate,
  selectedQueueTemplate,
  selectedWatchedTemplate,
} from './cardTemplate';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import { initializePagination, paginationSettings } from './pagination';
import Notiflix from 'notiflix';

refs.movieList.addEventListener('click', onLibraryClick);

let watchedRemove;
let queueRemove;
let currentMovie;

function onLibraryClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  const card = e.target.closest('li');
  movieApi.id = card.dataset.id;
  try {
    movieApi.getMovie().then(data => {
      const formattedData = dataFormat(data);
      currentMovie = formattedData;
      let modalMarkup;
      console.log(currentMovie);

      if (paginationSettings.paginationType === 'watched') {
        modalMarkup = selectedWatchedTemplate(formattedData);
        refs.movieModal.innerHTML = modalMarkup;
        onWatchedCard();
      } else {
        modalMarkup = selectedQueueTemplate(formattedData);
        refs.movieModal.innerHTML = modalMarkup;
        onQueueCard();
      }

      refs.backdrop.classList.toggle('is-hidden');
      refs.body.classList.toggle('locked');

      refs.modalCloseBtn.addEventListener('click', toggleLibraryModal);
      window.addEventListener('keydown', onEscPress);
      refs.backdrop.addEventListener('click', onBackdropClick);
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

function onWatchedCard() {
  watchedRemove = document.querySelector('[data-watched-remove]');
  watchedRemove.addEventListener('click', removeFromWatchedLib);
}

function onQueueCard() {
  queueRemove = document.querySelector('[data-queue-remove]');
  queueRemove.addEventListener('click', removeFromQueueLib);
}

async function removeFromWatchedLib() {
  const { userId, userEmail, watchedMovies, queuedMovies } = await getDoc(
    doc(db, 'users', auth.currentUser.uid)
  ).then(res => {
    return res.data();
  });
  const filtered = watchedMovies.filter(movie => {
    return movie.id !== currentMovie.id;
  });
  await setDoc(doc(db, 'users', auth.currentUser.uid), {
    userId,
    userEmail,
    watchedMovies: filtered,
    queuedMovies,
  });
  paginationSettings.maxPages = Math.ceil(filtered.length / 20);
  let paginatedResults = filtered.filter((result, index) => {
    return index < movieApi.page * 20 && index >= movieApi.page * 20 - 20;
  });

  console.log(paginatedResults);

  if (paginatedResults.length === 0) {
    console.log('empty');
    movieApi.page -= 1;
    paginatedResults = filtered.filter((result, index) => {
      return index < movieApi.page * 20 && index >= movieApi.page * 20 - 20;
    });
  }
  const markup = paginatedResults.map(cardLibraryTemplate).join('');
  refs.movieList.innerHTML = markup;
  initializePagination();
  toggleLibraryModal();
  Notiflix.Notify.success('Removed successfully');
}

async function removeFromQueueLib() {
  const { userId, userEmail, watchedMovies, queuedMovies } = await getDoc(
    doc(db, 'users', auth.currentUser.uid)
  ).then(res => {
    return res.data();
  });
  const filtered = queuedMovies.filter(movie => {
    return movie.id !== currentMovie.id;
  });
  await setDoc(doc(db, 'users', auth.currentUser.uid), {
    userId,
    userEmail,
    watchedMovies,
    queuedMovies: filtered,
  });
  paginationSettings.maxPages = Math.ceil(filtered.length / 20);
  let paginatedResults = filtered.filter((result, index) => {
    return index < movieApi.page * 20 && index >= movieApi.page * 20 - 20;
  });

  console.log(paginatedResults);

  if (paginatedResults.length === 0) {
    console.log('empty');
    movieApi.page -= 1;
    paginatedResults = filtered.filter((result, index) => {
      return index < movieApi.page * 20 && index >= movieApi.page * 20 - 20;
    });
  }
  const markup = paginatedResults.map(cardLibraryTemplate).join('');
  refs.movieList.innerHTML = markup;
  initializePagination();
  toggleLibraryModal();
  Notiflix.Notify.success('Removed successfully');
}

function toggleLibraryModal() {
  refs.backdrop.classList.toggle('is-hidden');
  refs.body.classList.toggle('locked');
  window.removeEventListener('keydown', onEscPress);
  refs.modalCloseBtn.removeEventListener('click', toggleLibraryModal);
  refs.backdrop.removeEventListener('click', onBackdropClick);
  if (watchedRemove) {
    watchedRemove.removeEventListener('click', removeFromWatched);
  } else {
    queueRemove.removeEventListener('click', removeFromQueue);
  }
}

function onEscPress(e) {
  if ((e.code = 'ESC')) {
    toggleLibraryModal();
  }
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    toggleLibraryModal();
  }
}
