import axios from 'axios';
import Raty from 'raty-js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const BASE_URL = 'https://deserts-store.b.goit.study/api/feedbacks/';

const limit = 8;

async function getFeedbacksResponse(page = 1) {
  try {
    const { data } = await axios(BASE_URL, {
      params: {
        limit,
        page,
      },
    });
    console.log(data);

    return data;
  } catch (error) {
    console.log(error.message);
  }
}

const reviewList = document.querySelector('.review-list');

function createFeedbacks(responses) {
  const markup = responses
    .map(response => {
      return `
      <li class="swiper-slide">
      <div class="review-box">
        <div class="review-rating" data-rate="${response.rate}"></div>
        <p class="review-desc">"${response.description}"</p>
        <p class="review-author">${response.author}</p>
        </div>
      </li>
      `;
    })
    .join('');

  reviewList.insertAdjacentHTML('beforeend', markup);
  createStars();
}

function createStars() {
  const ratings = document.querySelectorAll('.review-rating');

  ratings.forEach(rating => {
    new Raty(rating, {
      starType: 'i',
      number: 5,
      score: Number(rating.dataset.rate),
      readOnly: true,
      starOn: 'fa-solid fa-star',
      starOff: 'fa-regular fa-star',
      starHalf: 'fa-solid fa-star-half-stroke',
      half: true,
    }).init();
  });
}

async function init() {
  const responses = await getFeedbacksResponse();

  createFeedbacks(responses.feedbacks);

  new Swiper('.review-swiper', {
    modules: [Navigation, Pagination],
    spaceBetween: 24,

    pagination: {
      el: '.review-pagination',
  clickable: true,
  dynamicBullets: false,
  renderBullet: function (index, className) {
    if (index < 6) {
      return '<span class="' + className + '"></span>';
    }
    return '';
      },
    },

    navigation: {
      prevEl: '.review-btn.prev',
      nextEl: '.review-btn.next',
    },

    breakpoints: {
      375: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });
}

init();
