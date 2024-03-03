const fanfary = new Audio("../common/sounds/fanfaryKoniec.wav");
const przegrana = new Audio("../common/sounds/przegranaKoniec.wav");
const nextBtn = document.getElementById('next-btn');
let num = 0;

window.onload = next;

function next(){
    nextBtn.classList.remove('widoczny');
	num = Math.floor(Math.random()*80);
    showSaint(num);
}

nextBtn.onclick = () => {
    next();
}

const obrazSwietego = document.querySelector('.obraz');
const listaOdpowiedzi = document.querySelector('.odpowiedzi'); 

function showSaint(num) {
    let odpowiedz = `<div class="odpowiedz"><span>${swieciStruct[num].opcje[0]}</span></div>
                    <div class="odpowiedz"><span>${swieciStruct[num].opcje[1]}</span></div>
                    <div class="odpowiedz"><span>${swieciStruct[num].opcje[2]}</span></div>
                    <div class="odpowiedz"><span>${swieciStruct[num].opcje[3]}</span></div>`;
    listaOdpowiedzi.innerHTML = odpowiedz;

    let obrazSwietegoTemp = `<img src="zdjSwieci/${swieciStruct[num].path}.jpg" alt="zdjęcie świętego"></div>`;
    obrazSwietego.innerHTML = obrazSwietegoTemp;

    const odpowiedzWybrana = document.querySelectorAll('.odpowiedz');
    for (let i = 0; i < 4; ++i) {
        odpowiedzWybrana[i].setAttribute('onclick', 'selectOption(this)');
    }
}

function selectOption(odp) {
    let odpowiedzKliknieta = odp.textContent;
    if (odpowiedzKliknieta == swieciStruct[num].odpowiedzPoprawna) {
        odp.classList.add('poprawna');
        fanfary.play();
    }
    else {
        odp.classList.add('bledna');
        for (let i = 0; i < 4; i++) {
            if (listaOdpowiedzi.children[i].textContent == swieciStruct[num].odpowiedzPoprawna) {
                listaOdpowiedzi.children[i].classList.add('poprawna');
            }
        }
        przegrana.play();
    }

    for (let i = 0; i < 4; i++) {
        listaOdpowiedzi.children[i].classList.add('niedostepna');
    }

    nextBtn.classList.add('widoczny');
}