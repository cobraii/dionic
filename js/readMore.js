new Swiper('.swiper-container.swiper-standart', {
    slidesPerView: 1,
    spaceBetween: 50,
    speed: 500,
    loop: true,
    navigation: {
        nextEl: '.swiper-standart-next',
        prevEl: '.swiper-standart-prev',
    },
    pagination: {
        el: '.swiper-standart-pagination',
        clickable: true,
    },
});