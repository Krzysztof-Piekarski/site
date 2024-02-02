let haslo = "";
let hasloWidoczne = "";
let szanse = 10;
let doWyboru = new Array(35);
let kolejneBtn = document.getElementById("kolejne");
doWyboru[0] = "A";
doWyboru[1] = "Ą";
doWyboru[2] = "B";
doWyboru[3] = "C";
doWyboru[4] = "Ć";
doWyboru[5] = "D";
doWyboru[6] = "E";
doWyboru[7] = "Ę";
doWyboru[8] = "F";
doWyboru[9] = "G";
doWyboru[10] = "H";
doWyboru[11] = "I";
doWyboru[12] = "J";
doWyboru[13] = "K";
doWyboru[14] = "L";
doWyboru[15] = "Ł";
doWyboru[16] = "M";
doWyboru[17] = "N";
doWyboru[18] = "Ń";
doWyboru[19] = "O";
doWyboru[20] = "Ó";
doWyboru[21] = "P";
doWyboru[22] = "Q";
doWyboru[23] = "R";
doWyboru[24] = "S";
doWyboru[25] = "Ś";
doWyboru[26] = "T";
doWyboru[27] = "U";
doWyboru[28] = "V";
doWyboru[29] = "W";
doWyboru[30] = "X";
doWyboru[31] = "Y";
doWyboru[32] = "Z";
doWyboru[33] = "Ż";
doWyboru[34] = "Ź";

let klik = new Audio("../../common/sounds/klik.wav");
let misclick = new Audio("../../common/sounds/misclick.wav");
let fanfaryKoniec = new Audio("../../common/sounds/fanfaryKoniec.wav");
let przegranaKoniec = new Audio("../../common/sounds/przegranaKoniec.wav");

kolejneBtn.addEventListener("click", function(){
	szanse = 10;
	document.getElementById("kwiatObr").innerHTML = '<img src="../kwiat/kwiat'+szanse+'.png" alt="Kwiat">';
	hasloWidoczne = "";
	document.getElementById("zgadywane").classList.remove('przegrana');
	document.getElementById("zgadywane").classList.remove('wygrana');
	document.getElementById("litery").classList.remove('zablokowane');
	kolejneBtn.classList.remove('widoczne');
	begin();
});

function wypisz(){
	document.getElementById("zgadywane").innerHTML = hasloWidoczne;
}

window.onload = begin;

function begin(){
	haslo = hasla[Math.floor(Math.random()*50)]; 

	for(let i=0; i<haslo.length; i++){
		if(haslo.charAt(i)==" ") hasloWidoczne += " ";
		else
		hasloWidoczne += "-";
		}

	wypisz();

	let zawartosc_diva = "";

	for(let i=0; i<=34; i++){
		let divId = "litera" + i;
		zawartosc_diva = zawartosc_diva + '<div class="litera" id="'+divId+'" onclick="check('+i+')">'+doWyboru[i]+'</div>';
		if((i+1)%7 == 0) zawartosc_diva = zawartosc_diva + '<div style="clear:both;"><div>';
	}

	document.getElementById("litery").innerHTML = zawartosc_diva;
}

String.prototype.wstawLitere = function(pozycja, lit){
	if(pozycja > this.length-1 || pozycja < 0) return this.toString();
	else return this.substr(0,pozycja) + lit + this.substr(pozycja+1);
}

function check(num){
	let poprawna = false;
	for(let i=0; i<haslo.length; i++){
		if(haslo.charAt(i)==doWyboru[num]){
			poprawna = true;
			hasloWidoczne = hasloWidoczne.wstawLitere(i,doWyboru[num]);
		}
	}

	if(poprawna){
		klik.play();
		document.getElementById("litera"+num).classList.add('poprawna');
	}
	else{
		document.getElementById("litera"+num).classList.add('niepoprawna');
		misclick.play();
		szanse--;
		if(szanse>=0){
			document.getElementById("kwiatObr").innerHTML = '<img src="../kwiat/kwiat'+szanse+'.png" alt="Kwiat">';
		}
	}
	wypisz();

	if(hasloWidoczne == haslo){
		fanfaryKoniec.play();
		document.getElementById("zgadywane").classList.add('wygrana');
		document.getElementById("litery").classList.add('zablokowane');
		kolejneBtn.classList.add('widoczne');
	}

	if(szanse==0){
		przegranaKoniec.play();
		hasloWidoczne = haslo;
		wypisz();
		document.getElementById("zgadywane").classList.add('przegrana');
		document.getElementById("litery").classList.add('zablokowane');
		kolejneBtn.classList.add('widoczne');
	}
}