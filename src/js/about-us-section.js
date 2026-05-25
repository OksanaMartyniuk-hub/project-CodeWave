function initSlider() {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.slide_active');
  const nextBtn = document.querySelector('.next');
  const prevBtn = document.querySelector('.prev');
  const dots = document.querySelectorAll('.slider-dots li');

  if (!slides.length || !track) return;

  let currentIndex = 0;

  function updateSlider() {
    if (window.innerWidth < 768) {
      track.style.transform = 'none';
      track.style.transition = 'none';
      return;
    }

    const computedGap = parseFloat(window.getComputedStyle(track).gap) || 0;
    const slideWidth = slides[0].getBoundingClientRect().width + computedGap;

    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    track.style.transition = 'transform 300ms ease';

    if (dots.length) {
      dots.forEach(dot => {
        dot.classList.remove('dot_active');
        dot.classList.add('dot');
      });

      if (dots[currentIndex]) {
        dots[currentIndex].classList.remove('dot');
        dots[currentIndex].classList.add('dot_active');
      }
    }
  }

  function getMaxIndex() {
    if (window.innerWidth >= 1440) {
      return slides.length - 1;
    } else if (window.innerWidth >= 768) {
      return slides.length - 2;
    }
    return 0;
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (window.innerWidth < 768) return;
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateSlider();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (window.innerWidth < 768) return;
      const maxIndex = getMaxIndex();
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateSlider();
    });
  }

  if (dots.length) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        if (window.innerWidth < 768) return;
        const maxIndex = getMaxIndex();

        if (index <= maxIndex) {
          currentIndex = index;
          updateSlider();
        }
      });
    });
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth < 768) {
      currentIndex = 0;
    } else {
      const maxIndex = getMaxIndex();
      if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
      }
    }
    updateSlider();
  });

  updateSlider();
}

const checkExist = setInterval(() => {
  const trackExists = document.querySelector('.slider-track');
  if (trackExists) {
    clearInterval(checkExist);
    initSlider();
  }
}, 50);
