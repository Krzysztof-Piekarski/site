const slowo = document.querySelectorAll('.slowoOut');
const pusteMiejsce = document.querySelectorAll('.slowoIn');

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
                szukana.classList.add('ukryte');
            }
        });

    }
    else {
        wybranePusteMiejsce.classList.remove('poprawna');
        wybranePusteMiejsce.classList.add('bledna');
    }
}