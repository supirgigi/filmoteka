import { refs } from './refs';
import { movieApi } from './Api';
import { dataFormat } from './dataFormat';
import { db, auth } from './auth';
import { selectedMovieTemplate } from './cardTemplate';
import { getDoc, doc, setDoc } from 'firebase/firestore';
import Notiflix from 'notiflix';

refs.movieList.addEventListener('click', onGalleryClick);

let watchedAdd;
let queueAdd;
let currentMovie;

function onGalleryClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  const card = e.target.closest('li');
  movieApi.id = card.dataset.id;
  movieApi.getMovie().then(data => {
    const formattedData = dataFormat(data);
    currentMovie = formattedData;
    console.log(currentMovie);

    const modalMarkup = selectedMovieTemplate(formattedData);
    refs.movieModal.innerHTML = modalMarkup;
    onGalleryCard();

    refs.backdrop.classList.toggle('is-hidden');
    refs.body.classList.toggle('locked');

    refs.modalCloseBtn.addEventListener('click', toggleModal);
    window.addEventListener('keydown', onEscPress);
    refs.backdrop.addEventListener('click', onBackdropClick);
  });
}

function onGalleryCard() {
  watchedAdd = document.querySelector('[data-watched-add]');
  queueAdd = document.querySelector('[data-queue-add]');

  watchedAdd.addEventListener('click', addToWatched);
  queueAdd.addEventListener('click', addToQueue);
}

function toggleModal() {
  refs.backdrop.classList.toggle('is-hidden');
  refs.body.classList.toggle('locked');
  window.removeEventListener('keydown', onEscPress);
  refs.modalCloseBtn.removeEventListener('click', toggleModal);
  refs.backdrop.removeEventListener('click', onBackdropClick);
  watchedAdd.removeEventListener('click', addToWatched);
  queueAdd.removeEventListener('click', addToQueue);
}

function onEscPress(e) {
  console.log(e.code);
  if (e.code === 'Escape') {
    toggleModal();
  }
}

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    toggleModal();
  }
}

async function addToWatched() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }
  const userData = await getDoc(doc(db, 'users', auth.currentUser.uid)).then(
    res => {
      return res.data();
    }
  );
  console.log(userData);
  const { userId, watchedMovies, queuedMovies, userEmail } = userData;
  const compare = watchedMovies.find(movie => movie.id === currentMovie.id);
  if (compare) {
    Notiflix.Notify.failure('Already in collection');
    return;
  }
  watchedMovies.push(currentMovie);
  await setDoc(doc(db, 'users', auth.currentUser.uid), {
    userId,
    userEmail,
    watchedMovies,
    queuedMovies,
  });
  Notiflix.Notify.success('Added to watched');
}

async function addToQueue() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }
  const userData = await getDoc(doc(db, 'users', auth.currentUser.uid)).then(
    res => {
      return res.data();
    }
  );
  console.log(userData);
  const { userId, watchedMovies, queuedMovies, userEmail } = userData;
  const compare = queuedMovies.find(movie => movie.id === currentMovie.id);
  if (compare) {
    Notiflix.Notify.failure('Already in collection');
    return;
  }
  queuedMovies.push(currentMovie);
  await setDoc(doc(db, 'users', auth.currentUser.uid), {
    userId,
    userEmail,
    watchedMovies,
    queuedMovies,
  });
  Notiflix.Notify.success('Added to queue');
}
