const mainSwiper = new Swiper('.swiper-container.swiper-hotel-number', {
    slidesPerView: 'auto',
    speed: 500,
    initialSlide: 1,
    allowTouchMove: false,
    centeredSlides: true,
    loop: true,
    effect: "coverflow",
    coverflowEffect: {
        rotate: 0,
        stretch: -100,
        depth: 200,
        modifier: 1,
        slideShadows: true,
    },
    on: {
        init: function () {
            updateSlideVisibility(this);
            initNestedSwiper(this);
        },
        slideChange: function () {
            updateSlideVisibility(this);
            initNestedSwiper(this);
        },
        slideChangeTransitionEnd: function() {
            updateSlideVisibility(this);
            initNestedSwiper(this);
        }
    }
});

function initNestedSwiper(mainSwiper) {
    // Деактивируем предыдущий вложенный Swiper, если он существует
    const previousActiveSlide = mainSwiper.slides[mainSwiper.previousIndex];
    if (previousActiveSlide) {
        const previousNestedSwiper = previousActiveSlide.querySelector('.swiper-container.swiper-hotel-number-image');
        if (previousNestedSwiper && previousNestedSwiper.swiper) {
            previousNestedSwiper.swiper.destroy();
            previousNestedSwiper.swiper = null;
        }
    }

    // Инициализируем вложенный Swiper для текущего активного слайда
    const activeSlide = mainSwiper.slides[mainSwiper.activeIndex];
    const nestedSwiper = activeSlide.querySelector('.swiper-container.swiper-hotel-number-image');
    if (nestedSwiper && !nestedSwiper.swiper) {
        nestedSwiper.swiper = new Swiper(nestedSwiper, {
            slidesPerView: 1,
            spaceBetween: 50,
            speed: 700,
            loop: true,
            autoplay: {
                delay: 2000,
            },
            pagination: {
                el: nestedSwiper.querySelector('.swiper-image-pagination'),
                clickable: true,
            },
        });
    }
}

mainSwiper.slides.forEach((slide) => {
    slide.addEventListener('click', () => {
        const realIndex = parseInt(slide.getAttribute('data-swiper-slide-index'));
        const nextSlideIndex = (mainSwiper.realIndex + 1) % mainSwiper.slides.length;
        const prevSlideIndex = (mainSwiper.realIndex - 1 + mainSwiper.slides.length) % mainSwiper.slides.length;

        if (realIndex === nextSlideIndex) {
            mainSwiper.slideNext();
        } else if (realIndex === prevSlideIndex) {
            mainSwiper.slidePrev();
        }
    });
});

function updateSlideVisibility(swiper) {
    swiper.slides.forEach((slide) => {
        const infoWrapper = slide.querySelector('.hotel-number-info-wrapper');
        if (infoWrapper) {
            infoWrapper.style.display = 'none';
        }
    });

    const activeSlide = swiper.slides[swiper.activeIndex];
    if (activeSlide) {
        const activeInfoWrapper = activeSlide.querySelector('.hotel-number-info-wrapper');
        if (activeInfoWrapper) {
            activeInfoWrapper.style.display = 'block';
        }
    }
}


new Swiper('.swiper-container.swiper-sauna', {
    slidesPerView: 1,
    speed: 500,
    loop: true,
    autoplay: {
        delay: 2000,
    },
    pagination: {
        el: '.swiper-sauna-pagination',
        clickable: true,
    },
});



new Swiper('.swiper-container.swiper-photo', {
    slidesPerView: 1,
    spaceBetween: 50,
    speed: 500,
    navigation: {
        nextEl: '.swiper-photo-next',
        prevEl: '.swiper-photo-prev',
    },
    pagination: {
        el: '.swiper-photo-pagination',
        clickable: true,
    },
});



