const quizStartBtn = document.querySelector('.quiz-start-button');
const quizPopupInfo = document.querySelector('.quiz-popup-info');
const exitPopupInfo = document.querySelector('.exit-popup-info');
const main = document.querySelector('.main');
const continuePopupInfo = document.querySelector('.continue-popup-info');
const quizSection = document.querySelector('.quiz-section');

quizStartBtn.onclick = () => {
    quizPopupInfo.classList.add('active');
    main.classList.add('active');
}

exitPopupInfo.onclick = () => {
    quizPopupInfo.classList.remove('active');
    main.classList.remove('active');
}

continuePopupInfo.onclick = () => {
    quizSection.classList.add('active');
    quizPopupInfo.classList.remove('active');
    main.classList.remove('active');
}