import './css/styles.css';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import "simplelightbox/dist/simple-lightbox.min.css";
import NewsApiGalleryService from './fetchGallery';

const refs = {
    searchForm: document.querySelector('#search-form'),
    divEl: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
    startBtn: document.querySelector('button[data-start]'),
    inputform: document.querySelector('input')
}

let isShown = 0;

//Переменная , чтоб получить обьект с методами и свойствами
const GalleryEl = new NewsApiGalleryService();
// Работа кнопки при сабмите формы
refs.searchForm.addEventListener('submit', onFormSubmit);
// Работа кнопки при Добавить ещё
refs.loadMoreBtn.addEventListener('click', onLoadMore);

// Функция при при сабмите формы
async function onFormSubmit(e) {
    e.preventDefault();

// Делаем не активную кнопку
    if (e.currentTarget.elements.searchQuery.value === '') {
        return innerHTML = '';
     }
       
    // Записуется значения инпута searchQuery
    GalleryEl.query = e.target.elements.searchQuery.value.trim();
    isShown = 0;
    refs.divEl.innerHTML = '';
    GalleryEl.resetPage();
    fetchGallery();

}

// Функция при Добавить ещё
function onLoadMore() {
    GalleryEl.incrementPage();
    fetchGallery();

}
 
async function fetchGallery() {
        // Скрываем кнопку
    refs.loadMoreBtn.classList.add('is-hidden');
    
    // refs.startBtn.disabled = false;
    const response = await GalleryEl.fetchGallery();
    const { hits, total } = response;

    // Если бэкенд возвращает пустой массив, значит ничего подходящего найдено небыло
    if (!hits.length) {
        Notiflix.Notify.failure(
            'Sorry, there are no images matching your search query. Please try again.'
        );
    }

    renderGallery(hits);

    isShown += hits.length;

    if (isShown < total) {
        // Показывае кнопку
        refs.loadMoreBtn.classList.remove('is-hidden');

    }
    // Если пользователь дошел до конца коллекции, пряч кнопку и выводи уведомление с текстом:
    if (isShown >= total) {
        Notiflix.Notify.info(
            'We re sorry, but you have reached the end of search results.'
        );
    }
}

// Рисуем карточки
function renderGallery(elements) {
    console.log(elements);
    const markup = elements.map(({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
    }) => {
        return `
          <a class="gallery__link" href="${largeImageURL}">
                <div class="photo-card">
                    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${downloads}
                        </p>
                    </div>
                </div>
            </a>`;
    })
        .join('');
    // Добавляем на галерею карточек библиотеку SimpleLightbox
    refs.divEl.insertAdjacentHTML('beforeend', markup);
    const simpleLightbox = new SimpleLightbox('.gallery a');
}