import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import spriteUrl from '/img/sprite.svg';

// ── ID перших 3 карток ─────────────────────────────────────
const STATIC_IDS = [
  '6852a9fcb459460cb6b47768',
  '6852a9fcb459460cb6b4772b',
  '6852a9fcb459460cb6b47748',
];

// ── Dessert Card ───────────────────────────────────────────
function createDessertCardHTML(dessert) {
  const img =
    dessert.img ||
    dessert.imageUrl ||
    dessert.image ||
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&q=80';

  const rawCat = dessert.category || '';
  const category = typeof rawCat === 'object' ? rawCat?.name || '' : rawCat;
  const price = dessert.price !== undefined ? dessert.price + ' грн' : '';
  const desc = dessert.description || dessert.shortDescription || '';
  const id = dessert._id || dessert.id;

  return `
    <div class="dessert-card" data-id="${id}">
      <div class="dessert-card__img">
        <img src="${img}" alt="${dessert.name}" loading="lazy" width="300" height="200" />
      </div>
      <div class="dessert-card__body">
        ${category ? `<div class="dessert-card__category">${category}</div>` : ''}
        <h3 class="dessert-card__name">${dessert.name}</h3>
        ${desc ? `<p class="dessert-card__desc">${desc}</p>` : ''}
        <div class="dessert-card__footer">
          <div class="dessert-card__price">${price}</div>
          <button
            class="dessert-card__btn js-open-details"
            data-id="${id}"
            data-open-modal
            aria-label="Детальніше про ${dessert.name}"
            type="button"
          >
            <svg width="16" height="16" aria-hidden="true">
                <use href="${spriteUrl}#icon-arrow_outward"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;
}

// ── API ────────────────────────────────────────────────────
const instance = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

const LIMIT = 10;
let currentPage = 1;
let totalItems = 0;
let isLoading = false;
let swiperInstance = null;

const getPopularDesserts = page =>
  instance
    .get('/desserts', { params: { type: 'popular', limit: LIMIT, page } })
    .then(res => res.data);

const getDessertById = id =>
  instance.get(`/desserts/${id}`).then(res => res.data);

// ── Loader ─────────────────────────────────────────────────
const loaderEl = document.getElementById('loader');
let activeRequests = 0;

function showLoader() {
  activeRequests++;
  loaderEl?.classList.remove('hidden');
}

function hideLoader() {
  activeRequests = Math.max(0, activeRequests - 1);
  if (activeRequests === 0) loaderEl?.classList.add('hidden');
}

async function withLoader(fn) {
  showLoader();
  try {
    return await fn();
  } finally {
    hideLoader();
  }
}

// ── Toast ──────────────────────────────────────────────────
const toastOptions = {
  position: 'topRight',
  timeout: 4000,
  transitionIn: 'fadeInDown',
  transitionOut: 'fadeOutUp',
};

function toastError(message) {
  iziToast.error({ title: 'Помилка', message, ...toastOptions });
}

// ── Load more ──────────────────────────────────────────────
async function loadMoreDesserts() {
  if (isLoading) return;
  const loadedItems = currentPage * LIMIT;
  if (loadedItems >= totalItems) {
    iziToast.info({
      title: 'Інфо',
      message: 'Всі десерти завантажені',
      ...toastOptions,
    });
    return;
  }

  isLoading = true;
  currentPage++;

  try {
    const data = await withLoader(() => getPopularDesserts(currentPage));
    const desserts = data.desserts || [];

    const swiperWrapper = document.getElementById('popularSwiperWrapper');
    if (!swiperWrapper || !swiperInstance) return;

    desserts.forEach(d => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = createDessertCardHTML(d);
      swiperWrapper.appendChild(slide);
    });

    swiperInstance.update();
    updateNavBtns(swiperInstance);
  } catch (err) {
    toastError('Помилка підвантаження: ' + err.message);
    currentPage--;
  } finally {
    isLoading = false;
  }
}

// ── Init ───────────────────────────────────────────────────
async function initPopularProducts() {
  const wrapper = document.getElementById('popularSwiperWrapper');
  if (!wrapper) return;

  // Підтягуємо перші 3 картки з БД по id
  let staticDesserts = [];
  try {
    staticDesserts = await withLoader(() =>
      Promise.all(STATIC_IDS.map(id => getDessertById(id)))
    );
  } catch (err) {
    toastError('Не вдалося завантажити популярні товари');
    return;
  }

  wrapper.innerHTML = staticDesserts
    .map(d => `<div class="swiper-slide">${createDessertCardHTML(d)}</div>`)
    .join('');

  swiperInstance = new Swiper('.popular-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    watchOverflow: false,
    spaceBetween: 20,
    navigation: {
      prevEl: '#popularPrev',
      nextEl: '#popularNext',
      disabledClass: 'swiper-button-disabled',
    },
    pagination: {
      el: '.popular-pagination',
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 1,
    },
    breakpoints: {
      375: { slidesPerView: 1 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
    on: {
      init(swiper) {
        updateNavBtns(swiper);
      },
      slideChange(swiper) {
        updateNavBtns(swiper);
        if (swiper.isEnd) {
          loadMoreDesserts();
        }
      },
    },
  });

  // Підвантажуємо решту з бекенду в фоні
  try {
    const data = await withLoader(() => getPopularDesserts(currentPage));
    const desserts = (data.desserts || []).filter(
      d => !STATIC_IDS.includes(d._id)
    );
    totalItems = data.totalItems || desserts.length;

    desserts.forEach(d => {
      const slide = document.createElement('div');
      slide.className = 'swiper-slide';
      slide.innerHTML = createDessertCardHTML(d);
      wrapper.appendChild(slide);
    });

    swiperInstance.update();
    updateNavBtns(swiperInstance);
  } catch (err) {
    toastError('Не вдалося завантажити популярні товари');
  }
}

function updateNavBtns(swiper) {
  const prev = document.getElementById('popularPrev');
  const next = document.getElementById('popularNext');
  if (!prev || !next) return;
  prev.disabled = swiper.isBeginning;
  next.disabled = swiper.isEnd;
}

// Автовиклик
initPopularProducts();
