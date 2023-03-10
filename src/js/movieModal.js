import { refs } from './refs';
import { movieApi } from './Api';
import { dataFormat } from './dataFormat';
import { db, auth } from './auth';
import { selectedMovieTemplate } from './cardTemplate';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import Notiflix from 'notiflix';

refs.movieList.addEventListener('click', onGalleryClick);

let watchedAdd;
let queueAdd;
let currentMovie;

async function onGalleryClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }
  const card = e.target.closest('li');
  movieApi.id = card.dataset.id;
  try {
    movieApi.getMovie().then(async data => {
      const formattedData = dataFormat(data);
      currentMovie = formattedData;
      const modalMarkup = selectedMovieTemplate(formattedData);
      refs.movieModal.innerHTML = modalMarkup;
      onGalleryCard();

      if (auth.currentUser) {
        const userData = await getDoc(
          doc(db, 'users', auth.currentUser.uid)
        ).then(res => {
          return res.data();
        });
        console.log(userData);
        const { watchedMovies, queuedMovies } = userData;
        if (watchedMovies.find(movie => movie.id === currentMovie.id)) {
          toggleWatched();
        }
        if (queuedMovies.find(movie => movie.id === currentMovie.id)) {
          toggleQueue();
        }
      }
      refs.backdrop.classList.toggle('is-hidden');
      refs.body.classList.toggle('locked');
      refs.modalCloseBtn.addEventListener('click', toggleModal);
      window.addEventListener('keydown', onEscPress);
      refs.backdrop.addEventListener('click', onBackdropClick);
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
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
  watchedAdd.removeEventListener('click', removeFromWatched);
  queueAdd.removeEventListener('click', removeFromQueue);
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

function toggleWatched() {
  if (watchedAdd.textContent === 'add to watched') {
    watchedAdd.textContent = 'remove from watched';
    watchedAdd.removeEventListener('click', addToWatched);
    watchedAdd.addEventListener('click', removeFromWatched);
    watchedAdd.classList.add('modal-card-buttons__btn_current');
  } else {
    watchedAdd.textContent = 'add to watched';
    watchedAdd.addEventListener('click', addToWatched);
    watchedAdd.removeEventListener('click', removeFromWatched);
    watchedAdd.classList.remove('modal-card-buttons__btn_current');
  }
}

function toggleQueue() {
  if (queueAdd.textContent === 'add to queue') {
    queueAdd.textContent = 'remove from queue';
    queueAdd.removeEventListener('click', addToQueue);
    queueAdd.addEventListener('click', removeFromQueue);
    queueAdd.classList.add('modal-card-buttons__btn_current');
  } else {
    queueAdd.textContent = 'add to queue';
    queueAdd.addEventListener('click', addToQueue);
    queueAdd.removeEventListener('click', removeFromQueue);
    queueAdd.classList.remove('modal-card-buttons__btn_current');
  }
}

async function addToWatched() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }
  try {
    const { watchedMovies } = await getDoc(
      doc(db, 'users', auth.currentUser.uid)
    ).then(res => {
      return res.data();
    });

    watchedMovies.push(currentMovie);

    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      watchedMovies,
    }).then(() => {
      Notiflix.Notify.success('Added to watched');
      toggleWatched();
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

async function removeFromWatched() {
  try {
    let { watchedMovies } = await getDoc(
      doc(db, 'users', auth.currentUser.uid)
    ).then(res => {
      return res.data();
    });
    watchedMovies = watchedMovies.filter(movie => {
      return movie.id !== currentMovie.id;
    });
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      watchedMovies,
    }).then(() => {
      Notiflix.Notify.success('Removed successfully');
      toggleWatched();
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

async function addToQueue() {
  if (!auth.currentUser) {
    Notiflix.Notify.failure('Please sign in');
    return;
  }
  try {
    const { queuedMovies } = await getDoc(
      doc(db, 'users', auth.currentUser.uid)
    ).then(res => {
      return res.data();
    });

    queuedMovies.push(currentMovie);

    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      queuedMovies,
    }).then(() => {
      Notiflix.Notify.success('Added to queue');
      toggleQueue();
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}

async function removeFromQueue() {
  try {
    let { queuedMovies } = await getDoc(
      doc(db, 'users', auth.currentUser.uid)
    ).then(res => {
      return res.data();
    });
    queuedMovies = queuedMovies.filter(movie => {
      return movie.id !== currentMovie.id;
    });
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      queuedMovies,
    }).then(() => {
      Notiflix.Notify.success('Removed successfully');
      toggleQueue();
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  }
}
