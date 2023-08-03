const focus_frame = document.getElementById("FocusFrame");
const focus = document.getElementById("Focus");
const abstract_btn = document.getElementById("Abstract");
const nature_btn = document.getElementById("Nature");
const people_btn = document.getElementById("People");

let photos = document.getElementsByClassName("Photo");
let abstract = document.getElementsByClassName("Abstract");
let nature = document.getElementsByClassName("Nature");
let people = document.getElementsByClassName("People");

let showing = false;
let the_shown = null;
let toggled_abstract = true;
let toggled_nature = true;
let toggled_people = true;

abstract_btn.addEventListener("click", ToggleAbstract);
nature_btn.addEventListener("click", ToggleNature);
people_btn.addEventListener("click", TogglePeople);
focus.addEventListener("click", Unshow);

for (let i = 0; i < photos.length; i++)
	{
		photos[i].addEventListener("click", TestEvent);
	}

function TestEvent(event)
	{
		if (showing === false)
			{
				showing = true;
				the_shown = event.target;
				focus.src = the_shown.src.replace("small", "big");
				focus_frame.style.display = "block";
				let img_prop = focus.clientWidth;
				focus.style.left = (window.innerWidth - (focus.clientHeight * img_prop)) / 2;
			}
	}

function Unshow()
	{
		if (showing === true)
			{
				showing = false;
				focus.src = "";
				focus_frame.style.display = "none";
				the_shown = null
			}
	}

function ToggleAbstract()
	{
		if (toggled_abstract)
			{
				toggled_abstract = false;
				for (let i = 0; i < abstract.length; i++)
					{
						abstract[i].style.display = "none";
					}
			}
		else
			{
				toggled_abstract = true;
				// abstract[i].style.text-decoration: "none";
				for (let i = 0; i < abstract.length; i++)
					{
						abstract[i].style.display = "block";
					}
			}
	}

function ToggleNature()
	{
		if (toggled_nature)
			{
				toggled_nature = false;
				for (let i = 0; i < nature.length; i++)
					{
						nature[i].style.display = "none";
					}
			}
		else
			{
				toggled_nature = true;
				for (let i = 0; i < nature.length; i++)
					{
						nature[i].style.display = "block";
					}
			}
	}

function TogglePeople()
	{
		if (toggled_people)
			{
				toggled_people = false;
				for (let i = 0; i < people.length; i++)
					{
						people[i].style.display = "none";
					}
			}
		else
			{
				toggled_people = true;
				for (let i = 0; i < people.length; i++)
					{
						people[i].style.display = "block";
					}
			}
	}