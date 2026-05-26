import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dessertsList = document.querySelector('.desserts-list');
const popularList = document.querySelector('#popularSwiperWrapper');
const modal = document.querySelector('.details-modal-overlay');
const modalContent = document.querySelector('.details-modal');

const API = 'https://deserts-store.b.goit.study/api';

if (dessertsList) {
  dessertsList.addEventListener('click', openModal);
}
if (popularList) {
  popularList.addEventListener('click', openModal);
}
modalContent.addEventListener('click', onCloseButton);
document.addEventListener('keydown', onEscapeKey);

async function openModal(event) {
  try {
    const button = event.target.closest('[data-open-modal]');
    if (!button) return;

    const id = button.dataset.id;
    modal.classList.add('is-open');
    document.body.classList.add('no-scroll');
    modalContent.innerHTML = '<div class="loader" data-details-loader></div>';

    const dessert = await getDessert(id);
    renderModal(dessert);
    setTimeout(() => {
      document.addEventListener('click', onOutsideClick);
    });
  } catch (error) {
    closeModal();
    iziToast.error({
      message: 'Не вдалося завантажити інформацію про десерт',
      position: 'topRight',
    });
  }
}

async function getDessert(id) {
  const response = await axios(`${API}/desserts/${id}`);
  return response.data;
}

function renderModal({
  _id,
  name,
  description,
  price,
  image,
  composition,
  rate,
}) {
  const markup = `      
          <button
        class="details-modal-close"
        type="button"
        data-details-modal-close
        aria-label="Закрити модальне вікно"
      >
        <svg class="details-modal-close-icon" width="24" height="24">
          <use href="/img/sprite.svg#icon-close"></use>
        </svg>
      </button>
  <div class="details-modal-media">
        <img
          src="${image}"
          alt="${name}"
          class="details-modal-img"
        />
      </div>
      <div class="details-modal-content">
        <h2 class="details-modal-title">${name}</h2>
        <p class="details-modal-price">${price} грн</p>
        <ul class="details-modal-rate">
          ${renderRate(rate)}
        </ul>
        <p class="details-modal-text">
          ${description}
        </p>
        <p class="details-modal-ingredients">
          <span class="details-modal-ingredients-accent">Склад</span>: ${composition}
        </p>
        <button class="details-modal-button js-open-order" type="button" data-id="${_id}">
          Перейти до замовлення
        </button>
      </div>`;

  modalContent.innerHTML = markup;
}

function renderRate(rate) {
  const rating = Number(rate);
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  let starsRate = '';

  for (let i = 0; i < fullStars; i++) {
    starsRate += `
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-star"></use>
        </svg>
      </li>`;
  }

  if (hasHalfStar) {
    starsRate += `
      <li class="details-modal-star">
        <svg class="details-modal-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-half-star"></use>
        </svg>
      </li>`;
  }

  for (let i = 0; i < emptyStars; i++) {
    starsRate += `
      <li class="details-modal-star">
        <svg class="details-modal-empty-star-icon" width="16" height="15.2">
          <use href="/img/sprite.svg#icon-star"></use>
        </svg>
      </li>`;
  }

  return starsRate;
}

function closeModal() {
  modal.classList.remove('is-open');
  document.removeEventListener('click', onOutsideClick);
  document.body.classList.remove('no-scroll');
  cleanModal();
}

function onCloseButton(event) {
  if (event.target.closest('.js-open-order')) {
    closeModal();
    return;
  }
  if (!event.target.closest('[data-details-modal-close]')) return;
  closeModal();
}

function onOutsideClick(event) {
  if (!modalContent.contains(event.target)) {
    closeModal();
  }
}

function onEscapeKey(event) {
  if (event.key !== 'Escape') return;
  if (!modal.classList.contains('is-open')) return;
  closeModal();
}

function cleanModal() {
  modalContent.innerHTML = '';
}
