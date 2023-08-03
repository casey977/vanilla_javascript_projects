const weight = document.getElementById("Weight");
const height = document.getElementById("Height");
const submit = document.getElementById("Submit");
const result = document.getElementById("Result");
const comment = document.getElementById("Comment");

let bmi;

submit.addEventListener("click", HandleSubmit);

function HandleSubmit()
	{
		let h = height.value;
		let w = weight.value;
		bmi = Math.round(CalcBMI(w, h));
		result.innerHTML = "Your BMI: " + String(bmi);

		if (bmi < 18.5)
			{
				comment.innerHTML = "You're underweight!";
			}
		else if (bmi < 24.9 && bmi > 18.5)
			{
				comment.innerHTML = "You're in healthy weight!";
			}
		else if (bmi < 29.9 && bmi > 25)
			{
				comment.innerHTML = "You're overweight!";
			}
		else if (bmi >= 30)
			{
				comment.innerHTML = "You're obese!";
			}

		height.value = "";
		weight.value = "";
	}

function CalcBMI(weight, height)
	{
		return (weight / height / height) * 10000;
	}