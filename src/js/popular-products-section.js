import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

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
            aria-label="Детальніше про ${dessert.name}"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 13L13 3M13 3H6M13 3V10"
                stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
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

const getPopularDesserts = () =>
  instance
    .get('/desserts', { params: { type: 'popular' } })
    .then(res => res.data);

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

// ── Init ───────────────────────────────────────────────────
async function initPopularProducts() {
  const wrapper = document.getElementById('popularSwiperWrapper');
  if (!wrapper) return;

  let desserts = [];
  try {
    const data = await withLoader(() => getPopularDesserts());
    desserts = Array.isArray(data)
      ? data
      : data.results || data.desserts || data.data || [];
  } catch (err) {
    toastError('Не вдалося завантажити популярні товари');
    return;
  }

  if (!desserts.length) {
    document.querySelector('.popular-products')?.remove();
    return;
  }

  wrapper.innerHTML = desserts
    .map(d => `<div class="swiper-slide">${createDessertCardHTML(d)}</div>`)
    .join('');

  new Swiper('.popular-swiper', {
    modules: [Navigation, Pagination],
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      prevEl: '#popularPrev',
      nextEl: '#popularNext',
      disabledClass: 'swiper-button-disabled',
    },
    pagination: {
      el: '.popular-pagination',
      clickable: true,
    },
    breakpoints: {
      375: { slidesPerView: 1.2 },
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
      1280: { slidesPerView: 4 },
    },
    on: {
      init(swiper) {
        updateNavBtns(swiper);
      },
      slideChange(swiper) {
        updateNavBtns(swiper);
      },
    },
  });
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
