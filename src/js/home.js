import { movieApi } from './Api';
import { refs } from './refs';
import { dataFormat } from './dataFormat';
import { paginationSettings, initializePagination } from './pagination';
import { cardTemplate } from './cardTemplate';
import { spinner } from './preloader';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './auth';
import { doc } from 'firebase/firestore';

function onHomeLoad() {
  spinner.show();
  movieApi.getTrending().then(data => {
    console.log(data.results);
    paginationSettings.maxPages = data.total_pages;
    console.log(paginationSettings);
    initializePagination();
    const formattedResults = data.results.map(dataFormat);
    const markup = formattedResults.map(cardTemplate).join('');
    refs.movieList.innerHTML = markup;

    spinner.close();
  });
  refs.pagination.classList.remove('visually-hidden');
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log('user logged in: ', user);
    refs.authSignOut.parentElement.classList.remove('hidden');
    refs.authOpen.parentElement.classList.add('hidden');
    // docRef = doc(db, 'users', `${user.uid}`);
  } else {
    console.log('user logged out');
    refs.authSignOut.parentElement.classList.add('hidden');
    refs.authOpen.parentElement.classList.remove('hidden');
    // docRef = null;
  }
});

onHomeLoad();
