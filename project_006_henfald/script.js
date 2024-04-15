let her = document.getElementById("Her");
let antal = Number(document.getElementById("Antal"));
let sider = document.getElementById("Sider");
let kast = document.getElementById("Kast");
let resultat = document.getElementById("Resultat");

her.addEventListener("click", InsertDecayList);

function InsertDecayList() {

	let liste = [];
	let nyt_antal = 1000;
	let count = 0;
	let div = 5.0 / 6.0;

	for(let i = 0; i < 10; i++) {
		for(let j = 0; j < nyt_antal; j++) {
				if(Math.random() < div) {
						count += 1;
				}
		}
		liste.push(count);
		nyt_antal = count;
		count = 0;
	}

	let para = document.createElement("p");
	let le_string = "";
	for (let i = 0; i < liste.length; i++) {
		le_string += liste[i] + " ";
	}
	let node = document.createTextNode(le_string);
	para.appendChild(node);
	resultat.appendChild(para);
}
