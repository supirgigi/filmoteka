import { movieApi } from './Api';
import { refs } from './refs';
import { dataFormat } from './dataFormat';
import { cardTemplate } from './cardTemplate';
import { paginationSettings, initializePagination } from './pagination';
import { spinner } from './preloader';
import Notiflix from 'notiflix';

refs.searchForm.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();

  const currentQuery = e.currentTarget.elements.search.value;

  if (currentQuery === '') {
    Notiflix.Notify.failure('Please enter correct movie title');
    return;
  }

  if (currentQuery !== movieApi.query) {
    movieApi.query = currentQuery;
  }

  spinner.show();

  paginationSettings.paginationType = 'search';
  console.log(paginationSettings.paginationType);
  movieApi.resetPage();

  try {
    movieApi.searchMovies().then(data => {
      if (data.results.length === 0) {
        Notiflix.Notify.failure('No matches');
        spinner.close();
        return;
      }
      console.log(data);
      paginationSettings.maxPages = data.total_pages;
      console.log(paginationSettings);
      initializePagination();
      const formattedResults = data.results.map(dataFormat);
      const markup = formattedResults.map(cardTemplate).join('');
      refs.movieList.innerHTML = markup;
    });
  } catch (error) {
    Notiflix.Notify.failure(error.message);
  } finally {
    spinner.close();
  }
}
