import axios from 'axios';
// const axios = require('axios').default;

// Логика работы с API
// class NewsApiGalleryService отвечает за запросы на API
export default class NewsApiGalleryService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
// Ключи, базовый URL
    async fetchGallery() {
        console.log(this);
    const BASE_URL = `https://pixabay.com/api/`;
    const API_KEY = `30285540-e7c7e2dc98146360d5825362e`;
       
    const response = await axios.get(
              `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&
      image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&
      per_page=40`
          );
    return response.data;
    }

    incrementPage() {
        this.page += 1;
    }
    resetPage() {
        this.page = 1;
    }
    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery
    }

}
 