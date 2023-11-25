const quizStartBtn = document.querySelector('.quiz-start-button');
const quizPopupInfo = document.querySelector('.quiz-popup-info');
const exitPopupInfo = document.querySelector('.exit-popup-info');
const main = document.querySelector('.main');
const continuePopupInfo = document.querySelector('.continue-popup-info');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const rezultatBox = document.querySelector('.rezultat');
const kolejnePodejscieBtn = document.querySelector('.kolejne-podejscie-btn');
const resultExit = document.querySelector('.wyjscie-btn'); 

quizStartBtn.onclick = () => {
    quizPopupInfo.classList.add('active');
    main.classList.add('active');
}

exitPopupInfo.onclick = () => {
    quizPopupInfo.classList.remove('active');
    main.classList.remove('active');
}

continuePopupInfo.onclick = () => {
    quizPopupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');
    quizSection.classList.add('active');

    showQuestions(0);
}

kolejnePodejscieBtn.onclick = () => {
    quizBox.classList.add('active');
    rezultatBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    wynik = 0;
    showQuestions(questionCount);
    headerWynikUpdate()
}

resultExit.onclick = () => {
    quizSection.classList.remove('active');
    rezultatBox.classList.remove('active');
    nextBtn.classList.remove('active');
    questionCount = 0;
    wynik = 0;
}

let questionCount = 0;
let wynik = 0;

const nextBtn = document.querySelector('.quiz-next');

nextBtn.onclick = () => {
    if (questionCount < pytania.length - 1) {
        questionCount++;
        showQuestions(questionCount);

        nextBtn.classList.remove('active');
    }
    else {
        quizBox.classList.remove('active');
        rezultatBox.classList.add('active');

        const tekstWyniku = document.querySelector('.tekst-wyniku');
        tekstWyniku.textContent = `Uzyskano ${wynik}/${pytania.length}`;

        const wizualizacjaWyniku = document.querySelector('.kolowy-wykres');
        const wartoscWyniku = document.querySelector('.wartosc-procentowa');
        let wynikStart = -50;
        let wynikEnd = (wynik / pytania.length) * 100;
        let speed = 20;

        let interwalWynik = setInterval(() => {
            wynikStart++;
            if (wynikStart >= 0) {
                wartoscWyniku.textContent = `${wynikStart}%`;
                wizualizacjaWyniku.style.background = `conic-gradient(#11ff11 ${wynikStart * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
            }
            if (wynikStart == wynikEnd) {
                clearInterval(interwalWynik);
            }
        }, speed);
    }
}

const listaOdpowiedzi = document.querySelector('.odpowiedzi'); 

function showQuestions(index) {
    const questionText = document.querySelector('.pytanie');
    questionText.textContent = `${pytania[index].numb}. ${pytania[index].pytanie}`;

    let odpowiedz = `<div class="odpowiedz"><span>${pytania[index].opcje[0]}</span></div>
                    <div class="odpowiedz"><span>${pytania[index].opcje[1]}</span></div>
                    <div class="odpowiedz"><span>${pytania[index].opcje[2]}</span></div>
                    <div class="odpowiedz"><span>${pytania[index].opcje[3]}</span></div>`;

    listaOdpowiedzi.innerHTML = odpowiedz;

    const odpowiedzWybrana = document.querySelectorAll('.odpowiedz');
    for (let i = 0; i < 4; ++i) {
        odpowiedzWybrana[i].setAttribute('onclick', 'selectOption(this)');
    }

    const numerPytania = document.querySelector('.question-total');
    numerPytania.textContent = `${pytania[index].numb} z ${pytania.length} pytań`;
}

function selectOption(odp) {
    let odpowiedzKliknieta = odp.textContent;
    if (odpowiedzKliknieta == pytania[questionCount].odpowiedzPoprawna) {
        odp.classList.add('poprawna');
        wynik++;
    }
    else {
        odp.classList.add('bledna');
        for (let i = 0; i < 4; i++) {
            if (listaOdpowiedzi.children[i].textContent == pytania[questionCount].odpowiedzPoprawna) {
                listaOdpowiedzi.children[i].classList.add('poprawna');
            }
        }
    }

    for (let i = 0; i < 4; i++) {
        listaOdpowiedzi.children[i].classList.add('niedostepna');
    }

    nextBtn.classList.add('active');

    headerWynikUpdate();
}

function headerWynikUpdate() {
    const actualScore = document.querySelector('.header-score');
    actualScore.textContent = `Wynik: ${wynik}/${pytania.length}`
}