import { genres } from './genres';
import placeholderImg from '../images/no-image.png';

const imageUrl = 'https://image.tmdb.org/t/p/w500/';
// const placeholderImg = '../images/placeholder.jpg';

export function dataFormat(item) {
  let formattedGenres = [];

  if (item.genres) {
    if (item.genres.length !== 0) {
      item.genres.forEach(genre => {
        const filtered = genres.find(item => item.id === genre.id);
        formattedGenres.push(filtered.name);
      });
    }
  }

  if (item.genre_ids) {
    if (item.genre_ids.length !== 0) {
      item.genre_ids.forEach(id => {
        const filtered = genres.find(genre => genre.id === id);
        formattedGenres.push(filtered.name);
      });
    }
  }

  if (formattedGenres.length > 2) {
    item.full_genres = [...formattedGenres].join(', ');
    formattedGenres = formattedGenres.slice(0, 2);
    formattedGenres[2] = 'Other';
    item.genres = formattedGenres.join(', ');
  } else if (formattedGenres.length > 0) {
    item.full_genres = [...formattedGenres].join(', ');
    item.genres = formattedGenres.join(', ');
  } else {
    item.full_genres = 'Genre unknown';
    item.genres = 'Genre unknown';
  }

  if (item.release_date) {
    if (item.release_date !== '') {
      item.release_date = item.release_date.slice(0, 4);
    } else {
      item.release_date = 'n/a';
    }
  } else {
    item.release_date = 'n/a';
  }

  if (item.vote_average) {
    item.vote_average = item.vote_average.toFixed(1);
  }

  if (item.popularity) {
    item.popularity = item.popularity.toFixed(1);
  }

  if (!item.poster_path) {
    // item.poster_path =
    //   'https://sd.keepcalms.com/i/keep-calm-poster-not-found.png';
    item.poster_path = placeholderImg;
  } else {
    item.poster_path = imageUrl + item.poster_path;
    // https://image.tmdb.org/t/p/w500/
  }

  delete item.spoken_languages;
  delete item.status;
  delete item.tagline;
  delete item.belongs_to_collection;
  delete item.budget;
  delete item.homepage;
  delete item.imdb_id;
  delete item.production_companies;
  delete item.revenue;
  delete item.runtime;
  delete item.genre_ids;
  delete item.first_air_date;
  delete item.adult;
  delete item.video;
  delete item.backdrop_path;
  delete item.media_type;
  delete item.original_language;
  delete item.original_name;
  delete item.origin_country;
  delete item.name;

  return item;
}
