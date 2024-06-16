
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