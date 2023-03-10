import { movieApi } from './Api';
import { refs } from './refs';
import { dataFormat } from './dataFormat';
import { paginationSettings, initializePagination } from './pagination';
import { cardTemplate } from './cardTemplate';
import { spinner } from './preloader';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './auth';

function onHomeLoad() {
  spinner.show();
  try {
    movieApi.getTrending().then(data => {
      console.log(data.results);
      paginationSettings.maxPages = data.total_pages;
      console.log(paginationSettings);
      initializePagination();
      const formattedResults = data.results.map(dataFormat);
      const markup = formattedResults.map(cardTemplate).join('');
      refs.movieList.innerHTML = markup;
      refs.pagination.classList.remove('visually-hidden');
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  } finally {
    spinner.close();
  }
}

onAuthStateChanged(auth, user => {
  if (user) {
    console.log('user logged in: ', user);
    refs.authSignOut.parentElement.classList.remove('hidden');
    refs.authOpen.parentElement.classList.add('hidden');
  } else {
    console.log('user logged out');
    refs.authSignOut.parentElement.classList.add('hidden');
    refs.authOpen.parentElement.classList.remove('hidden');
  }
});

onHomeLoad();
