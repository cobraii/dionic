const block = document.querySelector('.block')
const navElement = document.querySelectorAll(".nav-links-el")

// const flutter = document.querySelector(".flutter")
// const buttonContinued = document.querySelectorAll(".form-button-continued")
// const flutterClose = document.querySelector('.form-close')

// flutterClose.addEventListener('click', ()=>{
//     flutter.classList.add('none')
// })

// ctaButton.forEach(item =>{
//     item.addEventListener('click', () =>{
//         flutter.classList.remove('none')
//         document.body.style.overflow = 'hidden'
//     })
// })


document.querySelector('.hamburger-menu').addEventListener('click', function () {
	block.classList.toggle('block--active');
});

document.querySelector('.block-prev').addEventListener('click', function () {
    block.classList.remove('block--active');
});

navElement.forEach(item => {
    item.addEventListener("click", ()=> {
        block.classList.remove('block--active');
    })
})

function scroll () {

    const contactsButton = document.querySelectorAll('.contact-myself-button');
    const contactsElement = document.getElementById('contacts');

    contactsButton.forEach(item => {
        item.addEventListener('click', function () {
            contactsElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

scroll ()