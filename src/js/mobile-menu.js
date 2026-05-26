const burgerMenuBtn = document.querySelector('.open-burger-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const openMenuIcon = document.querySelector('[data-open-menu]');
const closeMenuIcon = document.querySelector('[data-close-menu]');

burgerMenuBtn.addEventListener('click', toggleMobileMenu);
mobileMenu.addEventListener('click', closeMobileMenu);

function toggleMobileMenu() {
  document.body.classList.toggle('no-scroll');
  mobileMenu.classList.toggle('is-open');
  openMenuIcon.classList.toggle('hidden');
  closeMenuIcon.classList.toggle('hidden');
}

function closeMobileMenu(event) {
  if (!event.target.closest('a')) return;
  document.body.classList.remove('no-scroll');
  mobileMenu.classList.remove('is-open');
  openMenuIcon.classList.remove('hidden');
  closeMenuIcon.classList.add('hidden');
}
