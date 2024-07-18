import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

import { fetchImages } from './api/api';

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-bar'),
  btn: document.querySelector('.search-button'),
  gallery: document.querySelector('.gallery'),
  btnLoad: document.querySelector('.load-more'),
  loader: document.querySelector('.loader'),
};
//LightBox
const lightbox = new SimpleLightbox('.gallery a', {});

refs.formEl.addEventListener('submit', onFormSubmit);
refs.btnLoad.addEventListener('click', onLoadMoreClick);
let queue = null;
let page = null;

// Form submit
function onFormSubmit(evt) {
  evt.preventDefault();
  const aux = queue;
  page = 1;
  queue = evt.currentTarget.elements[0].value;
  evt.currentTarget.reset();

  // Check if user searches the same image
  if (queue === aux) return;
  if (aux) clearImages(); // If it's second or further request

  // Make fetch and work with data
  getImages(queue, page);
  console.log('q: ', queue);

  console.log('aux: ', aux);
}
function onLoadMoreClick() {
  isLoadMoreShown(false);
  page++;
  getImages(queue, page);
}
function clearImages() {
  isLoadMoreShown(false);
  refs.gallery.innerHTML = '';
}
function getImages(queue, page) {
  isLoaderShown(true);

  fetchImages(queue, page)
    .then(data => {
      isLoaderShown(false);
      isLoadMoreShown(true);

      if (!data.total) {
        isLoadMoreShown(false);
        return Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      if (data.hits.length === 0) {
        isLoadMoreShown(false);
        return Notiflix.Notify.warning('THERE ARE NO MORE PICTURES');
      }

      renderImages(data.hits);
    })
    .catch(error => alert(error.message));
}
function renderImages(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags: alt,
        likes,
        views,
        comments,
        downloads,
      }) => `

  <div class="photo-card">
        <a href = "${largeImageURL}" class = "photo-link">
  <img src="${webformatURL}" alt="${alt}" loading="lazy" />
         </a>
  <div class="info">
    <p class="info-item">
      <b>Likes ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${downloads}</b>
    </p>
  </div>
 
</div>
`
    )
    .join('');

  refs.gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}
function isLoaderShown(show) {
  show
    ? refs.loader.classList.remove('hidden')
    : refs.loader.classList.add('hidden');
}
function isLoadMoreShown(show) {
  show
    ? refs.btnLoad.classList.remove('hidden')
    : refs.btnLoad.classList.add('hidden');
}
