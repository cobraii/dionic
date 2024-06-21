const block = document.querySelector('.block')
const navElement = document.querySelectorAll(".nav-links-el")
const flutter = document.querySelector(".flutter")
const buttonReserve = document.querySelectorAll(".reserve-button")
const datesArrival = document.querySelector('.form-content-dates-arrival')
const humanData = document.querySelector('.form-content-human-data')
const titleText = document.querySelector(".form-order-call-checkbox-title")

buttonReserve.forEach(item =>{
    item.addEventListener('click', () =>{
        flutter.classList.remove('none')
        document.body.style.overflow = 'hidden'
    })
})

function formApplication(){

    document.querySelector('.form-button-cancel').addEventListener('click', (e) =>{
        e.preventDefault()
        flutter.classList.add('none')
        document.body.style.overflow = 'visible'
    })
    
    document.querySelector('.form-button-continued').addEventListener('click', (e) =>{
        
        e.preventDefault()
        datesArrival.classList.add('none')
        humanData.classList.remove('none')

        if(titleText.innerText !== 'E-mail'){
            document.querySelector("#form-email").style.display = 'none'
            document.querySelector("#form-phone").style.display = 'block'
        } else{
            document.querySelector("#form-phone").style.display = 'none'
        }
    })
    
    document.querySelector('.form-button-prev').addEventListener('click', (e) =>{
        e.preventDefault()
        datesArrival.classList.remove('none')
        humanData.classList.add('none')
        document.querySelector("#form-email").style.display = ''
    })
}

function formOrderCall() {
    const ordeCallBlock = document.querySelector('.form-order-call-block')
    const form = document.querySelector('.form')
    document.querySelector('.form-order-call-select-container-button').addEventListener('click', (e) =>{
        e.preventDefault()
        if (ordeCallBlock.classList.contains('none')) {
            ordeCallBlock.classList.remove('none');
        } else {
            ordeCallBlock.classList.add('none');
        }
    })

    ordeCallBlock.querySelectorAll('.form-order-call-list li').forEach(function(item) {
        item.addEventListener('click', function() {
            titleText.innerText = this.getAttribute('data-value');
            ordeCallBlock.classList.add('none');
        });
    });
}

function hamburgerMenuView(){
    
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
}

function scroll () {
    const contactsButton = document.querySelectorAll('.contact-myself-button');
    const contactsElement = document.getElementById('contacts');

    contactsButton.forEach(item => {
        item.addEventListener('click', function () {
            contactsElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
};

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('form-checkIn').addEventListener('change', function() {
        updateDateDisplay('form-checkIn', 'dateDisplayArrival');
    });

    document.getElementById('form-checkOut').addEventListener('change', function() {
        updateDateDisplay('form-checkOut', 'dateDisplayDeparture');
    });
});

function updateDateDisplay(inputId, displayId) {
    const dateInput = document.getElementById(inputId);
    const dateDisplay = document.getElementById(displayId);
    const date = new Date(dateInput.value);
    if (!isNaN(date.getTime())) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2);
        dateDisplay.textContent = `${day}.${month}.${year}`;
        dateDisplay.style.color = '#f8f9fb';
    } else {
        dateDisplay.textContent = '01.06.24';
        dateDisplay.style.color = '#3e3e3e';
    }
}

let requests = [];

const inputs = {
    checkIn: document.getElementById("form-checkIn"),
    checkOut: document.getElementById("form-checkOut"),
    firstname: document.getElementById("form-name"),
    lastname: document.getElementById("form-surname"),
    phone: document.getElementById("form-phone"),
    email: document.getElementById("form-email"),
    connection: document.querySelector(".form-order-call-checkbox-title"),
};

class Request {
    constructor(data) {
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.checkIn = data.checkIn;
        this.checkOut = data.checkOut;
        this.connection = data.connection;
        if (data.email) {
            this.email = data.email;
        }
        if (data.phone) {
            this.phone = data.phone;
        }
    }
}

function formatDate(dateString) {
    let parts = dateString.split('.');
    // Переупорядочиваем части и склеиваем с разделителем "-"
    return `20${parts[2]}-${parts[0]}-${parts[1]}`;
}

function formatPhone(phoneNumber) {
    // Удаляем все символы, кроме цифр
    let cleaned = phoneNumber.replace(/\D/g, '');
    
    // Если номер начинается с "7" или "+7", добавляем "8" в начало
    if (cleaned.startsWith('7')) {
        return '8' + cleaned.substr(1);
    } else if (cleaned.startsWith('+7')) {
        return '8' + cleaned.substr(2);
    }
    // Возвращаем как есть, если не начинается с "7" или "+7"
    return cleaned;
}

function addRequest(formInputs) {
    const connections = {
        'Звонок': 'BY_PHONE',
        'Telegram': 'BY_TELEGRAM',
        'WhatsApp': 'BY_WHATS_APP',
        'E-mail': 'BY_EMAIL',
    };

    let connectionMethod = connections[formInputs.connection.textContent];
    let requestData = {
        firstname: formInputs.firstname.value.trim(),
        lastname: formInputs.lastname.value.trim(),
        checkIn: formInputs.checkIn.value.trim(),
        checkOut: formInputs.checkOut.value.trim(),
        connection: connectionMethod,
    };

    if (connectionMethod === 'BY_EMAIL') {
        requestData.email = formInputs.email.value.trim();
    } else {
        requestData.phone = formatPhone(formInputs.phone.value.trim()); // Преобразуем номер телефона
    }

    let request = new Request(requestData);
    requests.push(request);
    return request;
}

async function sendRequestToServer(request) {
    try {
        const response = await fetch('http://188.225.83.63/api/create/client', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (response.ok) {
            // document.querySelector('.thanks-modal-wrapper').classList.remove('none');
            // document.querySelector('.section-content-form').classList.add('none');

            inputs.firstname.value = ''
            inputs.lastname.value = ''
            inputs.checkIn.value = ''
            inputs.checkOut.value = ''
            inputs.email.value = ''
            inputs.phone.value = ''
            inputs.phone.connection = ''
            // document.querySelector('.thanks-modal-wrapper').addEventListener('click', (event) => {
            //     const modal = document.querySelector('.thanks-modal');
            //     if (modal && !modal.contains(event.target)) {
            //         const wrapper = document.querySelector('.thanks-modal-wrapper');
            //         if (wrapper) {;
            //             wrapper.classList.add('none');
            //             window.setTimeout(() => {
            //                 wrapper.remove();
            //             }, 500);
            //         }
            //     }
            // })
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

document.querySelector('.form-button-reserve').addEventListener('click', async (e) => {
    e.preventDefault();
    const request = addRequest(inputs);
    await sendRequestToServer(request);
});


hamburgerMenuView()
formApplication()
formOrderCall()
scroll ()

