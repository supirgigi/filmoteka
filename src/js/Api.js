import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'd69968ee858c93c3dbc043339ed72979';

export default class movieDbApi {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.id = null;
  }

  async getTrending() {
    // https://api.themoviedb.org/3/trending/all/week?api_key=<<api_key>>
    const url = `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${this.page}`;
    const { data } = await axios.get(url);
    return data;
  }

  async getMovie() {
    // https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
    const url = `${BASE_URL}/movie/${this.id}?api_key=${API_KEY}`;
    const { data } = await axios.get(url);
    return data;
  }

  async searchMovies() {
    // https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&query=matrix&page=1&include_adult=false
    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&query=${this.searchQuery}&page=${this.page}&include_adult=false`;
    const { data } = await axios.get(url);
    return data;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

export const movieApi = new movieDbApi();
