let her = document.getElementById("Her");
let antal = document.getElementById("Antal");
let sider = document.getElementById("Sider");
let kast = document.getElementById("Kast");
let resultat = document.getElementById("Resultat");

her.addEventListener("click", InsertDecayList);

function InsertDecayList()
	{
		//let antal = document.getElementById("Antal");
		let liste = [];
		let nyt_antal = Number(antal.value);
		let temp;
		let count = 0;
		let div = 1.0 / Number(sider);

		// Randomiser rand-funktionen.

		for(let i = 0; i < kast; i++)
			{
				for(let j = 0; j < nyt_antal; j++)
					{
						if(Math.Random() < div)
							{
								count += 1;
							}
					}
				liste.append(count);
				nyt_antal = count;
				count = 0;
			}

		// Tilføj resultat til DOM/skærmen...
		let para = document.createElement("p");
		let le_string = ""
		for (let i = 0; i < liste.length; i++)
			{
				le_string += liste[i] + " ";
			}
		let node = document.createTextNode(le_string);
		para.appendChild(node);
		resultat.appendChild(para);
	}