import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selectWrapper = document.querySelector('.desserts-select-wrapper');
const trigger = selectWrapper.querySelector('.desserts-select-trigger');
const value = selectWrapper.querySelector('.desserts-select-value');
const filterList = selectWrapper.querySelector('.desserts-filter');
const categoriesLoader = document.querySelector('[data-categories-loader]');
const listLoader = document.querySelector('[data-list-loader]');
const dessertsList = document.querySelector('.desserts-list');
const loadMore = document.querySelector('.desserts-load-more');
const API = 'https://deserts-store.b.goit.study/api';
const PER_PAGE = 8;
let page = 1;

document.addEventListener('DOMContentLoaded', initDessertsPage);
loadMore.addEventListener('click', loadMoreDesserts);
filterList.addEventListener('click', filterByCategory);
trigger.addEventListener('click', toggleList);
filterList.addEventListener('click', closeList);
document.addEventListener('click', onOutsideClick);
document.addEventListener('keydown', onEscapeKey);

async function initDessertsPage() {
  try {
    showCategoriesLoader();
    showListLoader();
    hideLoadMore();
    const categories = await getCategories();
    const allCategories = [{ _id: 'all', name: 'Всі десерти' }, ...categories];
    renderCategories(allCategories);
    document
      .querySelector('.desserts-filter-button')
      .classList.add('is-active');
    hideCategoriesLoader();
    const { desserts, totalItems } = await getDesserts(page);

    if (desserts.length > 0) {
      renderDesserts(desserts);
      const loadedItems = document.querySelectorAll('.desserts-card').length;

      if (+totalItems > loadedItems) {
        showLoadMore();
      }
    } else {
      iziToast.warning({
        message: 'Desserts not found',
        position: 'topRight',
      });
    }
  } catch (error) {
    showErrorMessage();
  } finally {
    hideListLoader();
  }
}

async function filterByCategory(event) {
  try {
    if (event.target.nodeName !== 'BUTTON') return;

    const id = event.target.dataset.category;

    document
      .querySelectorAll('.desserts-filter-button')
      .forEach(item => item.classList.remove('is-active'));
    event.target.classList.add('is-active');

    showListLoader();
    clearList();
    hideLoadMore();

    page = 1;

    const { desserts, totalItems } =
      id === 'all'
        ? await getDesserts(page)
        : await getDessertsByCategory(id, page);

    if (desserts.length > 0) {
      renderDesserts(desserts);
      const loadedItems = document.querySelectorAll('.desserts-card').length;

      if (totalItems > loadedItems) {
        showLoadMore();
      }
    } else {
      iziToast.warning({
        message: 'Desserts not found',
        position: 'topRight',
      });
    }
  } catch (error) {
    showErrorMessage();
  } finally {
    hideListLoader();
  }
}

async function loadMoreDesserts() {
  try {
    showListLoader();
    hideLoadMore();
    loadMore.disabled = true;
    page++;
    const id = document.querySelector('.desserts-filter-button.is-active')
      .dataset.category;

    const { desserts, totalItems } =
      id === 'all'
        ? await getDesserts(page)
        : await getDessertsByCategory(id, page);

    if (desserts.length > 0) {
      renderDesserts(desserts);
      const loadedItems = document.querySelectorAll('.desserts-card').length;

      if (+totalItems > loadedItems) {
        showLoadMore();
      } else {
        showEndMessage();
      }
    }
  } catch (error) {
    showErrorMessage();
  } finally {
    hideListLoader();
    loadMore.disabled = false;
  }
}

async function getCategories() {
  const response = await axios(`${API}/categories`);
  return response.data;
}

async function getDessertsByCategory(category, page) {
  const { data } = await axios(`${API}/desserts`, {
    params: {
      page,
      limit: PER_PAGE,
      category,
    },
  });
  return data;
}

async function getDesserts(page) {
  const { data } = await axios(`${API}/desserts`, {
    params: {
      limit: PER_PAGE,
      page,
    },
  });

  return data;
}

function renderCategories(categories) {
  const markup = categories
    .map(({ _id, name }) => {
      return `
    <li class="desserts-filter-item">
      <button class="desserts-filter-button" type="button" data-category="${_id}">
        ${name}
      </button>
    </li>
    `;
    })
    .join('');

  filterList.insertAdjacentHTML('beforeend', markup);
}

function renderDesserts(arr) {
  const markup = arr
    .map(({ _id, name, description, price, category, image }) => {
      return `          <li class="desserts-card" id="${_id}" data-dessert>
            <div class="desserts-card-media">
              <img
                src="${image}"
                alt="${name}"
                class="desserts-card-img"
              />
            </div>
                <p class="desserts-card-category">${category.name}</p>
                <h3 class="desserts-card-title">${name}</h3>
                <p class="desserts-card-text">
                  ${description}
                </p>
              <div class="desserts-card-bottom">
                <p class="desserts-card-price">${price} грн</p>
                <button class="desserts-card-button" type="button" aria-label="Відкрити десерт" data-id="${_id}" data-open-modal>
                  <svg class="desserts-card-icon" width="24" height="24">
                    <use href="/img/sprite.svg#icon-arrow_outward"></use>
                  </svg>
                </button>
              </div>
          </li>`;
    })
    .join('');
  dessertsList.insertAdjacentHTML('beforeend', markup);
}

function closeList(event) {
  if (event.target.nodeName !== 'BUTTON') return;
  selectWrapper.classList.remove('is-open');
  const valueButton = event.target.textContent;
  value.textContent = valueButton;
  trigger.setAttribute('aria-expanded', 'false');
}

function toggleList() {
  selectWrapper.classList.toggle('is-open');

  trigger.setAttribute(
    'aria-expanded',
    selectWrapper.classList.contains('is-open') ? 'true' : 'false'
  );
}

function onOutsideClick(event) {
  if (!selectWrapper.contains(event.target)) {
    selectWrapper.classList.remove('is-open');

    trigger.setAttribute('aria-expanded', 'false');
  }
}

function onEscapeKey(event) {
  if (event.key !== 'Escape') return;

  selectWrapper.classList.remove('is-open');

  trigger.setAttribute('aria-expanded', 'false');
}

function showErrorMessage() {
  iziToast.error({
    title: 'Помилка',
    message: 'Не вдалося завантажити дані. Спробуйте пізніше.',
    position: 'topRight',
  });
}

function showEndMessage() {
  iziToast.info({
    title: 'Інформація',
    message: 'Ви дійшли до кінця списку.',
    position: 'topRight',
  });
}

function clearList() {
  dessertsList.innerHTML = '';
}

function showCategoriesLoader() {
  categoriesLoader.classList.remove('is-hidden');
}

function hideCategoriesLoader() {
  categoriesLoader.classList.add('is-hidden');
}

function showListLoader() {
  listLoader.classList.remove('is-hidden');
}

function hideListLoader() {
  listLoader.classList.add('is-hidden');
}

function showLoadMore() {
  loadMore.classList.remove('is-hidden');
}

function hideLoadMore() {
  loadMore.classList.add('is-hidden');
}
