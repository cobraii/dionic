const block = document.querySelector('.block');
const navElement = document.querySelectorAll(".nav-links-el");
const flutter = document.querySelector(".flutter");
const contentForm = document.querySelector('.section-content-form');
const buttonReserve = document.querySelectorAll(".reserve-button");
const datesArrival = document.querySelector('.form-content-dates-arrival');
const humanData = document.querySelector('.form-content-human-data');
const titleText = document.querySelector(".form-order-call-checkbox-title");
const thanksModalWrapper = document.querySelector('.thanks-modal-wrapper');

let currentStep = 0;

buttonReserve.forEach(item => {
    item.addEventListener('click', () => {
        flutter.classList.remove('none');
        document.body.style.overflow = 'hidden';
    });
});

function updateForm(steps, currentStep, prevButton) {
    steps.forEach((step, index) => {
        step.classList.toggle('none', index !== currentStep);
    });
    prevButton.classList.toggle('none', currentStep === 0);
}

function formApplication() {
    const form = document.querySelector('.form');
    const steps = Array.from(form.querySelectorAll('.form-content-dates-arrival, .form-content-number-human, .form-content-human-data'));
    const prevButton = form.querySelector('.form-button-prev');

    form.addEventListener('click', (event) => {
        if (event.target.closest('.form-button-continued')) {
            event.preventDefault();
            if (validateStep(currentStep)) {
                if (currentStep === 0) {
                    if (titleText.innerText !== 'E-mail') {
                        document.querySelector("#form-email").style.display = 'none';
                        document.querySelector("#form-phone").style.display = 'block';
                    } else {
                        document.querySelector("#form-phone").style.display = 'none';
                    }
                }
                currentStep++;
                updateForm(steps, currentStep, prevButton);
                document.querySelector('.error-message').classList.remove('active')
            } else {
                document.querySelector('.error-message').classList.add('active')
            }
        } else if (event.target.closest('.form-button-prev')) {
            event.preventDefault();
            if (currentStep > 0) {
                currentStep--;
                updateForm(steps, currentStep, prevButton);
                document.querySelector('.error-message').classList.remove('active')
            }
        } else if (event.target.closest('.form-button-cancel')) {
            event.preventDefault();
            flutter.classList.add('none');
            document.body.style.overflow = 'visible';
            currentStep = 0;
            updateForm(steps, currentStep, prevButton);
        }
    });
    updateForm(steps, currentStep, prevButton);
}

function validateStep(step) {
    switch (step) {
        case 0:
            return inputs.checkIn.value.trim() !== '' && inputs.checkOut.value.trim() !== '';
        case 1:
            return inputs.adults.value.trim() !== '' && inputs.kids.value.trim() !== '';
        case 2:
            return inputs.firstname.value.trim() !== '' && inputs.lastname.value.trim() !== '' &&
                (inputs.email.value.trim() !== '' || inputs.phone.value.trim() !== '');
        default:
            return false;
    }
}

function formOrderCall() {
    const ordeCallBlock = document.querySelector('.form-order-call-block');
    document.querySelector('.form-order-call-select-container-button').addEventListener('click', (e) => {
        e.preventDefault();
        ordeCallBlock.classList.toggle('none');
    });

    ordeCallBlock.querySelectorAll('.form-order-call-list li').forEach(function (item) {
        item.addEventListener('click', function () {
            titleText.innerText = this.getAttribute('data-value');
            ordeCallBlock.classList.add('none');
        });
    });
}

function formSelectNumber() {
    const selectNumberBlock = document.querySelector('.select-number-block');
    document.querySelector('.select-number-container-button').addEventListener('click', (e) => {
        e.preventDefault();
        selectNumberBlock.classList.toggle('none');
    });

    selectNumberBlock.querySelectorAll('.select-number-list li').forEach(function (item) {
        const titleText = document.querySelector('.select-number-container-title')
        item.addEventListener('click', function () {
            titleText.innerText = this.getAttribute('data-value');
            selectNumberBlock.classList.add('none');
        });
    });
}

function hamburgerMenuView() {
    document.querySelector('.hamburger-menu').addEventListener('click', function () {
        block.classList.toggle('block--active');
    });

    document.querySelector('.block-prev').addEventListener('click', function () {
        block.classList.remove('block--active');
    });

    navElement.forEach(item => {
        item.addEventListener("click", () => {
            block.classList.remove('block--active');
        });
    });
}

function scroll() {
    const contactsButton = document.querySelectorAll('.contact-myself-button');
    const contactsElement = document.getElementById('contacts');

    contactsButton.forEach(item => {
        item.addEventListener('click', function () {
            contactsElement.scrollIntoView({ behavior: 'smooth' });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('form-checkIn').addEventListener('change', function () {
        updateDateDisplay('form-checkIn', 'dateDisplayArrival');
    });

    document.getElementById('form-checkOut').addEventListener('change', function () {
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
    adults: document.getElementById("adults-number"),
    kids: document.getElementById("kids-number"),
    roomCategory: document.querySelector(".select-number-container-title"),
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
        this.adults = data.adults
        this.kids = data.kids
        this.roomCategory = data.roomCategory
    }
}

function formatPhone(phoneNumber) {
    let cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.startsWith('7')) {
        return '+7' + cleaned.substr(1);
    } else if (cleaned.startsWith('8')) {
        return '+7' + cleaned.substr(1);
    }
    return cleaned;
}

function addRequest(formInputs) {
    const connections = {
        'Звонок': 'BY_PHONE',
        'Telegram': 'BY_TELEGRAM',
        'WhatsApp': 'BY_WHATS_APP',
        'E-mail': 'BY_EMAIL',
    };

    const roomCategory = {
        'Стандарт': 'STANDARD',
        'Люкс': 'LUX',
    };
    
    let connectionMethod = connections[formInputs.connection.textContent.trim()];
    let roomCategoryMethod = roomCategory[formInputs.roomCategory.textContent.trim()];
    let requestData = {
        firstname: formInputs.firstname.value.trim(),
        lastname: formInputs.lastname.value.trim(),
        checkIn: formInputs.checkIn.value.trim(),
        checkOut: formInputs.checkOut.value.trim(),
        adults: formInputs.adults.value.trim(),
        kids: formInputs.kids.value.trim(),
        roomCategory: roomCategoryMethod,
        connection: connectionMethod,
    };

    if (connectionMethod === 'BY_EMAIL') {
        requestData.email = formInputs.email.value.trim();
    } else {
        requestData.phone = formatPhone(formInputs.phone.value.trim());
    }

    let request = new Request(requestData);
    requests.push(request);
    return request;
}

async function sendRequestToServer(request) {
    try {
        const response = await fetch('http://147.45.164.78/api/create/client', {
            method: 'POST',
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (response.ok) {
            document.querySelector('.form').reset();
            currentStep = 0;
            const form = document.querySelector('.form');
            const steps = Array.from(form.querySelectorAll('.form-content-dates-arrival, .form-content-number-human, .form-content-human-data'));
            const prevButton = form.querySelector('.form-button-prev');
            updateForm(steps, currentStep, prevButton); // обновим форму для первого шага

            document.querySelector('#dateDisplayArrival').textContent = '01.06.24';
            document.querySelector('#dateDisplayDeparture').textContent = '01.06.24';
            document.querySelector('#dateDisplayArrival').style.color = '#3e3e3e';
            document.querySelector('#dateDisplayDeparture').style.color = '#3e3e3e';
            document.querySelector('.form-order-call-checkbox-title').textContent = 'Звонок';
            inputs.connection = document.querySelector(".form-order-call-checkbox-title");
            contentForm.classList.add('none');
            thanksModalWrapper.classList.remove('none');

            const closeThanksModal = (event) => {
                if (!thanksModalWrapper.contains(event.target)) {
                    thanksModalWrapper.classList.add('none');
                    contentForm.classList.remove('none');
                    humanData.classList.add('none');
                    datesArrival.classList.remove('none');
                    flutter.classList.add('none');
                    document.body.style.overflow = 'visible';
                    document.removeEventListener('click', closeThanksModal);
                }
            };
            document.addEventListener('click', closeThanksModal);
        } else {
            const errorData = await response.json();
            console.error('Server error:', response.status, errorData);
        }
    } catch (error) {
        console.error('Fetch error:', error.message);
    }
}

document.querySelector('.form-button-reserve').addEventListener('click', async (e) => {
    e.preventDefault();
    if (validateStep(currentStep)){
        const request = addRequest(inputs);
        console.log('Request data:', request);
        await sendRequestToServer(request);
        document.querySelector('.error-message').classList.remove('active')
    } else{
        document.querySelector('.error-message').classList.add('active')
    }
    
});

hamburgerMenuView();
formApplication();
formOrderCall();
formSelectNumber();
scroll();