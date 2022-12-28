import { auth, db } from './auth';
import { movieApi } from './Api';
import { refs } from './refs';
import { dataFormat } from './dataFormat';
import { cardTemplate, cardLibraryTemplate } from './cardTemplate';
import { getDoc, doc } from 'firebase/firestore';
import { spinner } from './preloader';
import { toTopScroll } from './topScroll';

refs.paginationBtns.addEventListener('click', onPaginationClick);
refs.paginationArrowLeft.addEventListener('click', onPaginationArrowClick);
refs.paginationArrowRight.addEventListener('click', onPaginationArrowClick);

export const paginationSettings = {
  paginationType: 'trending',
  maxPages: null,
  perPage: 20,
};

function onPaginationArrowClick(e) {
  console.log(e.currentTarget);
  if (e.currentTarget.classList.contains('pagination-btn_arrow_left')) {
    movieApi.page--;
    handlePagination();
  }

  if (e.currentTarget.classList.contains('pagination-btn_arrow_right')) {
    movieApi.page++;
    handlePagination();
  }
}

function onPaginationClick(e) {
  if (e.target.classList.contains('pagination-btn_dots_left')) {
    movieApi.page -= 3;
    if (movieApi.page < 1) movieApi.page = 1;
    handlePagination();
  }

  if (e.target.classList.contains('pagination-btn_dots_right')) {
    movieApi.page += 3;
    if (movieApi.page > paginationSettings.maxPages)
      movieApi.page = paginationSettings.maxPages;
    handlePagination();
  }

  if (e.target.classList.contains('pagination-btn_numbered')) {
    console.log(e.target);
    movieApi.page = Number(e.target.textContent);
    handlePagination();
  }
}

export function initializePagination() {
  refs.paginationBtns.innerHTML = '';
  let maxLeft = movieApi.page - 2;
  let maxRight = movieApi.page + 2;

  if (maxLeft < 1) {
    maxLeft = 1;
    maxRight = 5;
  }

  if (maxRight > paginationSettings.maxPages) {
    maxLeft = paginationSettings.maxPages - 4;
    maxRight = paginationSettings.maxPages;
  }

  if (paginationSettings.maxPages === 0) {
    refs.pagination.classList.add('visually-hidden');
  }

  if (paginationSettings.maxPages < 6) {
    for (let page = 1; page <= paginationSettings.maxPages; page++) {
      if (page !== movieApi.page) {
        refs.paginationBtns.innerHTML += `<button class="pagination-btn pagination-btn_numbered">${page}</button>`;
      } else {
        refs.paginationBtns.innerHTML += `<button class="pagination-btn pagination-btn_numbered pagination-btn_active" disabled>${page}</button>`;
      }
    }
  } else {
    refs.paginationBtns.innerHTML += `<button id="extreme-left" class="pagination-btn pagination-btn_numbered pagination-btn_numbered_extreme">1</button>`;
    refs.paginationBtns.innerHTML +=
      '<button id="dots-left" class="pagination-btn pagination-btn_dots pagination-btn_dots_left">...</button>';
    // refs.paginationBtns.insertAdjacentHTML('');
    for (let page = maxLeft; page <= maxRight; page++) {
      if (page !== movieApi.page) {
        refs.paginationBtns.innerHTML += `<button class="pagination-btn pagination-btn_numbered">${page}</button>`;
      } else {
        refs.paginationBtns.innerHTML += `<button class="pagination-btn pagination-btn_numbered pagination-btn_active" disabled>${page}</button>`;
      }
    }
    refs.paginationBtns.innerHTML +=
      '<button id="dots-right" class="pagination-btn pagination-btn_dots pagination-btn_dots_right">...</button>';
    refs.paginationBtns.innerHTML += `<button id="extreme-right" class="pagination-btn pagination-btn_numbered pagination-btn_numbered_extreme">${paginationSettings.maxPages}</button>`;
  }

  if (paginationSettings.maxPages > 0) {
    refs.pagination.classList.remove('visually-hidden');
  }

  if (movieApi.page > 1) {
    document.getElementById('btn-left').disabled = false;
  } else {
    document.getElementById('btn-left').disabled = true;
  }

  if (movieApi.page < paginationSettings.maxPages) {
    document.getElementById('btn-right').disabled = false;
  } else {
    document.getElementById('btn-right').disabled = true;
  }

  if (movieApi.page < 4 && paginationSettings.maxPages > 5) {
    refs.paginationBtns.removeChild(document.getElementById('extreme-left'));
    refs.paginationBtns.removeChild(document.getElementById('dots-left'));
  }

  if (
    movieApi.page > paginationSettings.maxPages - 3 &&
    paginationSettings.maxPages > 5
  ) {
    refs.paginationBtns.removeChild(document.getElementById('extreme-right'));
    refs.paginationBtns.removeChild(document.getElementById('dots-right'));
  }

  console.log(movieApi.page);
}

function handlePagination() {
  initializePagination();
  renderCards();
}

async function renderCards() {
  spinner.show();
  if (paginationSettings.paginationType === 'trending') {
    movieApi.getTrending().then(data => {
      const formattedResults = data.results.map(dataFormat);
      const markup = formattedResults.map(cardTemplate).join('');
      refs.movieList.innerHTML = markup;
      spinner.close();
      // toTopScroll();
    });
  }

  if (paginationSettings.paginationType === 'search') {
    spinner.show();
    movieApi.searchMovies().then(({ results }) => {
      const formattedResults = results.map(dataFormat);
      const markup = formattedResults.map(cardTemplate).join('');
      refs.movieList.innerHTML = markup;
      spinner.close();
    });
  }

  if (paginationSettings.paginationType === 'watched') {
    spinner.show();
    const { watchedMovies } = await getDoc(
      doc(db, 'users', auth.currentUser.uid)
    ).then(res => {
      return res.data();
    });
    const paginatedResults = watchedMovies.filter((result, index) => {
      return (
        index < movieApi.page * paginationSettings.perPage &&
        index >=
          movieApi.page * paginationSettings.perPage -
            paginationSettings.perPage
      );
    });
    console.log(paginatedResults);
    const markup = paginatedResults.map(cardLibraryTemplate).join('');
    refs.movieList.innerHTML = markup;
    spinner.close();
  }

  if (paginationSettings.paginationType === 'queue') {
    spinner.show();
    const { queuedMovies } = await getDoc(
      doc(db, 'users', auth.currentUser.uid)
    ).then(res => {
      return res.data();
    });
    const paginatedResults = queuedMovies.filter((result, index) => {
      return (
        index < movieApi.page * paginationSettings.perPage &&
        index >=
          movieApi.page * paginationSettings.perPage -
            paginationSettings.perPage
      );
    });
    console.log(paginatedResults);
    const markup = paginatedResults.map(cardLibraryTemplate).join('');
    refs.movieList.innerHTML = markup;
    spinner.close();
  }

  // if (paginationSettings.paginationType === 'library') {
  //   const ref = doc(db, 'users', `${userUid}`);
  //   const { queuedMovies, watchedMovies } = await getDoc(ref).then(res => {
  //     return res.data();
  //   });
  //   const storedMovies = [...watchedMovies, ...queuedMovies];
  //   const paginatedResults = storedMovies.filter((result, index) => {
  //     return (
  //       index < movieApi.page * paginationSettings.perPage &&
  //       index >=
  //         movieApi.page * paginationSettings.perPage -
  //           paginationSettings.perPage
  //     );
  //   });
  //   console.log(paginatedResults);
  //   const markup = paginatedResults.map(cardTemplate).join('');
  //   refs.movieList.innerHTML = markup;
  // }
}
