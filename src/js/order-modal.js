import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// ── API ────────────────────────────────────────────────────
const instance = axios.create({
  baseURL: 'https://deserts-store.b.goit.study/api',
});

const postOrderRequest = body =>
  instance.post('/orders', body).then(res => res.data);

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

function toastSuccess(message) {
  iziToast.success({ title: 'Успіх', message, ...toastOptions });
}

function toastError(message) {
  iziToast.error({ title: 'Помилка', message, ...toastOptions });
}

// ── State ──────────────────────────────────────────────────
let activeDessertId = null;

// ── Init ───────────────────────────────────────────────────
function initOrderModal() {
  const overlay = document.getElementById('orderOverlay');
  const closeBtn = document.getElementById('orderClose');
  const form = document.getElementById('orderForm');

  document.addEventListener('open-order-modal', e => {
    activeDessertId = e.detail?.dessertId || null;
    openOrderModal();
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.js-open-order')) {
      activeDessertId = e.target.closest('.js-open-order')?.dataset?.id || null;
      openOrderModal();
    }
  });

  closeBtn?.addEventListener('click', closeOrderModal);
  overlay?.addEventListener('click', e => {
    if (e.target === overlay) closeOrderModal();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && !overlay?.hidden) closeOrderModal();
  });

  form?.addEventListener('submit', async e => {
    e.preventDefault();
    await handleSubmit(form);
  });

  // Очищення помилок при введенні
  document
    .getElementById('orderName')
    ?.addEventListener('input', () => clearError('orderName', 'nameError'));
  document
    .getElementById('orderPhone')
    ?.addEventListener('input', () => clearError('orderPhone', 'phoneError'));
  document
    .getElementById('orderComment')
    ?.addEventListener('input', () =>
      clearError('orderComment', 'commentError')
    );
}

function openOrderModal() {
  const overlay = document.getElementById('orderOverlay');
  if (!overlay) return;
  overlay.hidden = false;
  document.body.style.overflow = 'hidden';
  document.getElementById('orderName')?.focus();
}

function closeOrderModal() {
  const overlay = document.getElementById('orderOverlay');
  if (!overlay) return;
  overlay.hidden = true;
  document.body.style.overflow = '';
  clearAllErrors();
}

function setError(inputId, errorId, message) {
  document.getElementById(inputId)?.classList.add('error');
  const error = document.getElementById(errorId);
  if (error) {
    error.textContent = message;
    error.style.display = 'block';
  }
}

function clearError(inputId, errorId) {
  document.getElementById(inputId)?.classList.remove('error');
  const error = document.getElementById(errorId);
  if (error) {
    error.textContent = '';
    error.style.display = 'none';
  }
}

function clearAllErrors() {
  clearError('orderName', 'nameError');
  clearError('orderPhone', 'phoneError');
  clearError('orderComment', 'commentError');
}

async function handleSubmit(form) {
  clearAllErrors();

  const name = document.getElementById('orderName')?.value.trim();
  const comment = document.getElementById('orderComment')?.value.trim();
  const phone = (document.getElementById('orderPhone')?.value || '').replace(
    /\D/g,
    ''
  );
  const hasLetters = /[a-zA-Zа-яА-ЯёЁіІїЇєЄ]/.test(
    document.getElementById('orderPhone')?.value || ''
  );

  let valid = true;

  if (!name || name.length < 2) {
    setError(
      'orderName',
      'nameError',
      "Введіть коректне ім'я (мінімум 2 символи)"
    );
    valid = false;
  }

  if (hasLetters) {
    setError('orderPhone', 'phoneError', 'Телефон має містити лише цифри');
    valid = false;
  } else if (phone.length !== 12) {
    setError(
      'orderPhone',
      'phoneError',
      'Введіть рівно 12 цифр. Наприклад: 380961234568. Зараз: ' +
        phone.length +
        ' цифр'
    );
    valid = false;
  }

  if (!comment || comment.length < 2) {
    setError(
      'orderComment',
      'commentError',
      'Введіть коментар (мінімум 2 символи)'
    );
    valid = false;
  }

  if (!activeDessertId) {
    toastError('Спочатку оберіть десерт');
    closeOrderModal();
    document.getElementById('desserts')?.scrollIntoView({ behavior: 'smooth' });
    return;
  }

  if (!valid) return;

  const body = {
    name,
    phone,
    dessertId: activeDessertId,
    comment,
  };

  try {
    const result = await withLoader(() => postOrderRequest(body));
    toastSuccess(
      'Замовлення ' +
        (result.orderNum ? 'Nr' + result.orderNum + ' ' : '') +
        "прийнято! Ми зв'яжемося з вами."
    );
    form.reset();
    closeOrderModal();
    activeDessertId = null;
  } catch (err) {
    const status = err.response?.status;
    const message = err.response?.data?.message || err.message || '';

    if (status === 400) {
      toastError(
        'Невірні дані. Телефон має містити рівно 12 цифр (380961234568).'
      );
      return;
    }
    if (status === 404) {
      toastError('Десерт не знайдено.');
      return;
    }
    toastError(message || 'Сталася помилка. Спробуйте ще раз.');
  }
}

// Автовиклик
initOrderModal();
