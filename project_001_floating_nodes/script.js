const DESPAWN_BUFFER = 5.0;
const MAX_DIST = 150.0;

let num_stars = 75;
let diagonal_dist, canvas, ctx, time_a, time_b, avg_time;
let avg_time_counter = 0;

let stars = [];

window.addEventListener("load", BuildCanvas);
window.addEventListener("resize", HandleResize, 0);
window.addEventListener('keyup', KeyUp);

setInterval(UpdateCanvas, 1000 / 60);

function BuildCanvas()
	{
		canvas = document.getElementById("ccc");
		if (canvas.getContext)
			{
				ctx = canvas.getContext("2d");
				canvas.width = window.innerWidth;
   				canvas.height = window.innerHeight;
   				diagonal_dist = Math.sqrt(canvas.width ** 2 + canvas.height ** 2) * 0.5;

   				for (let i = 0; i < num_stars; i++)
					{
						SpawnDot();
					}
			}
		else
			{
				alert("ERROR: Can't get canvas context!");
			}
	}

function HandleResize()
	{
		canvas.width = window.innerWidth;
   		canvas.height = window.innerHeight;
   		DrawBackground();
	}

function KeyUp(event)
	{
		if (event.key === "i")
			{
				console.log(avg_time);
			}
	}

function DrawBackground()
	{
		ctx.fillStyle = "rgb(32, 32, 128)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

function UpdateCanvas()
	{
		time_a = performance.now();
		MoveDots();
		DrawBackground();
		DrawDots();
		DrawLines();
		time_b = performance.now();
		avg_time_counter = avg_time_counter + 1;
		avg_time = (avg_time + (time_b - time_a)) / avg_time_counter;
	}

function SpawnDot()
	{
		let dot =
			{
				radius: Math.random() + 2,
				speed: Math.random() * 0.65 + 0.1,
				pos_x: 0.0,
				pos_y: 0.0,
				move_x: 0.0,
				move_y: 0.0,
				dir_x: (canvas.width - canvas.width * 0.30) * Math.random() + canvas.width * 0.15,
				dir_y: (canvas.height - canvas.height * 0.30) * Math.random() + canvas.height * 0.15,
				direction: Math.PI * 2 * Math.random(),
				entered: false
			};

		dot.pos_x = Math.cos(dot.direction) * diagonal_dist + canvas.width / 2;
		dot.pos_y = Math.sin(dot.direction) * diagonal_dist + canvas.height / 2;

		dot.move_x = dot.pos_x - dot.dir_x;
		dot.move_y = dot.pos_y - dot.dir_y;

		const tmp_diag = Math.sqrt(dot.move_x ** 2 + dot.move_y ** 2);
		dot.move_x = -(dot.move_x / tmp_diag);
		dot.move_y = -(dot.move_y / tmp_diag);

		stars.push(dot);
	}

function MoveDots()
	{
		let dot_x, dot_y;
		for (let i = 0; i < stars.length; i++)
			{
				dot_x = stars[i].pos_x + (stars[i].move_x) * stars[i].speed;
				dot_y = stars[i].pos_y + (stars[i].move_y) * stars[i].speed;

				stars[i].pos_x = dot_x;
				stars[i].pos_y = dot_y;

				if ((dot_x > -(DESPAWN_BUFFER) && dot_x < (canvas.width + DESPAWN_BUFFER)) && (dot_y > -(DESPAWN_BUFFER) && dot_y < (canvas.height + DESPAWN_BUFFER)))
					{
						stars[i].entered = true;
					}
				else if (stars[i].entered)
					{
						stars.splice(i, 1);
						SpawnDot()
					}
			}
	}

function DrawDots()
	{
		for(let i = 0; i < stars.length; i++)
			{
				if(stars[i].entered)
					{
						ctx.fillStyle = "rgb(255, 255, 255)";
						ctx.beginPath();
						ctx.arc(stars[i].pos_x, stars[i].pos_y, stars[i].radius, 0, Math.PI * 2, false);
						ctx.fillStyle = "rgb(255, 255, 255)";
						ctx.fill();
					}
			}
	}

function DrawLines()
	{
		let x1, y1, x2, y2;
		for(let i = 0; i < stars.length; i++)
			{
				if(stars[i].entered)
					{
						for (let j = 0; j < stars.length; j++)
							{
								let x1 = stars[i].pos_x;
								let x2 = stars[j].pos_x;
								let y1 = stars[i].pos_y;
								let y2 = stars[j].pos_y;
								let dist = PythaDist(x1, y1, x2, y2);
								if (i != j && stars[j].entered && dist < MAX_DIST)
									{
										ctx.strokeStyle = "rgba(255, 255, 255, " + String(HandleOpacity(dist)) + ")";
										ctx.lineWidth = 0.25;
										ctx.beginPath();
										ctx.moveTo(x1, y1);
										ctx.lineTo(x2, y2);
										ctx.closePath();
										ctx.stroke();
									}
							}
					}
			}
	}

function PythaDist(x1, y1, x2, y2)
	{
		return Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);
	}

function HandleOpacity(x)
	{
		return Math.abs((x / MAX_DIST) - 1.0);
	}