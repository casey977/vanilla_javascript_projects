let selection = document.getElementById("Selection");
let running = document.getElementById("Running");
let submit_btn = document.getElementById("Submit");
let equation = document.getElementById("Equation");

document.addEventListener("keyup", HandleCancel);
submit_btn.addEventListener("click", HandleSubmit);

let interval;
let type;
let in_menu = true;
let term1, term2, result;

function HandleCancel()
	{
		clearInterval(interval);
		in_menu = false;
		ChangeDisplay();
	}

function HandleSubmit()
	{
		FindRadioValue();
		ChangeDisplay();
		ShowNewEquation()
		interval = setInterval(ShowNewEquation, 1000 * 10);
	}

function FindRadioValue()
	{
		let ele = document.getElementsByName("Which");

		for (i = 0; i < ele.length; i++)
			{
				if (ele[i].checked)
					{
						type = Number(ele[i].value);
					}
			}
	}

function ChangeDisplay()
	{
		if (in_menu)
			{
				in_menu = false;
				selection.style.display = "none";
				running.style.display = "block";
			}
		else
			{
				in_menu = true;
				selection.style.display = "block";
				running.style.display = "none";
			}
	}

function ShowNewEquation()
	{
		if (type === 1)
			{
				term1 = Math.round(Math.random() * 99);
				term2 = Math.round(Math.random() * 99);
				result = term1 + term2;
				equation.innerHTML = `${term1} + ${term2} = ${result}`;
			}
			else if (type === 2)
			{
				term1 = Math.round(Math.random() * 999);
				term2 = Math.round(Math.random() * 999);
				result = term1 + term2;
				equation.innerHTML = `${term1} + ${term2} = ${result}`;
			}
			else if (type === 3)
			{
				term1 = Math.round(Math.random() * 99);
				term2 = Math.round(Math.random() * 99);
				result = term1 - term2;
				equation.innerHTML = `${term1} − ${term2} = ${result}`;
			}
			else if (type === 4)
			{
				term1 = Math.round(Math.random() * 999);
				term2 = Math.round(Math.random() * 999);
				result = term1 - term2;
				equation.innerHTML = `${term1} − ${term2} = ${result}`;
			}
			else if (type === 5)
			{
				term1 = Math.round(Math.random() * 99);
				term2 = Math.round(Math.random() * 99);
				result = term1 * term2;
				equation.innerHTML = `${term1} × ${term2} = ${result}`;
			}
			else if (type === 6)
			{
				term1 = Math.round(Math.random() * 999);
				term2 = Math.round(Math.random() * 999);
				result = term1 * term2;
				equation.innerHTML = `${term1} × ${term2} = ${result}`;
			}
			else if (type === 7)
			{
				term1 = Math.round(Math.random() * 99);
				term2 = Math.round(Math.random() * 99);
				result = term1 / term2;
				equation.innerHTML = `${term1} / ${term2} = ${result}`;
			}
			else if (type === 8)
			{
				term1 = Math.round(Math.random() * 999);
				term2 = Math.round(Math.random() * 999);
				result = term1 / term2;
				result = Math.round(result * 100) / 100;
				equation.innerHTML = `${term1} / ${term2} = ${result}`;
			}
	}