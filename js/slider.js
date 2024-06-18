// Функция инициализации основного Swiper для десктопной версии
function initDesktopSwiper() {
    const mainSwiper = new Swiper('.swiper-container.swiper-hotel-number', {
        direction: 'horizontal',
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
                    delay: 5000,
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
}

// Функция инициализации основного Swiper для мобильной версии
function initMobileSwiper() {
    const mainSwiper = new Swiper('.swiper-container.swiper-hotel-number', {
        slidesPerView: 'auto',
        centeredSlides: false,
        allowTouchMove: true,
        loop: false,
        spaceBetween: 15,
        breakpoints: {
            760: {
              spaceBetween: 35
            },
        },
        effect: 'slide',
        initialSlide: 0,
        direction: 'vertical',
        touchStartPreventDefault: false, // Добавляем этот параметр
        touchReleaseOnEdges: true, // Добавляем этот параметр
    });

    const nestedSwipers = document.querySelectorAll('.swiper-container.swiper-hotel-number-image');
    nestedSwipers.forEach((nestedSwiperContainer) => {
        new Swiper(nestedSwiperContainer, {
            slidesPerView: 1,
            spaceBetween: 50,
            speed: 700,
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: nestedSwiperContainer.querySelector('.swiper-image-pagination'),
                clickable: true,
            },
        });
    });

    // Показываем блоки информации для всех слайдов
    mainSwiper.slides.forEach((slide) => {
        const infoWrapper = slide.querySelector('.hotel-number-info-wrapper');
        if (infoWrapper) {
            infoWrapper.style.display = 'block';
        }
    });
}

// Функция определения ширины экрана и инициализации соответствующего Swiper
function handleResize() {
    if (window.innerWidth < 1200) {
        initMobileSwiper();
    } else {
        initDesktopSwiper();
    }
}

// Инициализация Swiper при загрузке страницы
handleResize();

// Добавление обработчика события изменения размера окна
window.addEventListener('resize', handleResize);


new Swiper('.swiper-container.advantages-content', {
    slidesPerView: 'auto',
    speed: 500,
    spaceBetween: 50,
    breakpoints:{
        1100:{
            allowTouchMove: false,
        }
    },
    pagination: {
        el: '.swiper-advantages-pagination',
        clickable: true,
    },
    scrollbar: {
        el: '.swiper-advantages-scrollbar'
    },
});

new Swiper('.swiper-container.swiper-sauna', {
    slidesPerView: 1,
    speed: 500,
    loop: true,
    autoplay: {
        delay: 5000,
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
    loop: true,
    navigation: {
        nextEl: '.swiper-photo-next',
        prevEl: '.swiper-photo-prev',
    },
    pagination: {
        el: '.swiper-photo-pagination',
        clickable: true,
    },
});



