const slowo = document.querySelectorAll('.slowoOut');
const pusteMiejsce = document.querySelectorAll('.slowoIn');
const kolumna = document.querySelector('.kolumna');
const gratulacje = document.querySelector('.gratulacje');
const gratulacjeExit = document.querySelector('.wyjscieBtn');

const klik = new Audio("../../../common/sounds/klik.wav");
const misclick = new Audio("../../../common/sounds/misclick.wav");
const fanfaryKoniec = new Audio("../../../common/sounds/fanfaryKoniec.wav");

let counter = 0;

gratulacjeExit.onclick = () => {
    gratulacje.classList.remove('aktywne');
    kolumna.classList.remove('blur');
}

slowo.forEach(tile => {
    tile.addEventListener('dragstart', handleDragStart);
});

pusteMiejsce.forEach(pusteMiejsce => {
    pusteMiejsce.addEventListener('dragover', handleDragOver);
    pusteMiejsce.addEventListener('drop', handleDrop);
});

function handleDragStart(event) {
    event.dataTransfer.setData('text', event.target.textContent);
}

function handleDragOver(event) {
    event.preventDefault();
}

function handleDrop(event) {
    event.preventDefault();
    const wybraneSlowo = event.dataTransfer.getData('text');
    const wybranePusteMiejsce = event.target;

    wybranePusteMiejsce.textContent = wybraneSlowo;

    if (wybranePusteMiejsce.getAttribute('id') == wybranePusteMiejsce.textContent) {
        wybranePusteMiejsce.classList.remove('bledna');
        wybranePusteMiejsce.classList.add('poprawna');
        wybranePusteMiejsce.removeEventListener('drop', handleDrop);
        slowo.forEach(szukana => {
            if (szukana.textContent == wybraneSlowo) {
                klik.play();
                szukana.classList.add('ukryte');
                counter++;
                if (counter == 10) {
                    fanfaryKoniec.play();
                    gratulacje.classList.add('aktywne');
                    kolumna.classList.add('blur');
                    counter = 0;
                }
            }
        });

    }
    else {
        misclick.play();
        wybranePusteMiejsce.classList.remove('poprawna');
        wybranePusteMiejsce.classList.add('bledna');
    }
}