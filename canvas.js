var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, 0.5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, 0.5)';
// c.fillRect(300, 200, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, 0.5)';
// c.fillRect(200, 400, 100, 100);

//Line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400,300);
// c.strokeStyle = "#fa34a3";
// c.stroke();

//Arc/Circle c.arc(x, y, r, startAngle, endAngle, drawCounterClockwise)
// c.beginPath();
// c.arc(300, 300, 30, 0, Math.PI * 2, false);
// c.strokeStyle = "blue";
// c.stroke();

var color = '#';

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// for (var i = 0; i < 666; i++) {
// 	var x = Math.random() * window.innerWidth;
// 	var y = Math.random() * window.innerHeight;
// 	var r = Math.random() * 30;
// 	c.beginPath();
// 	c.arc(x, y, r, 0, Math.PI * 2, false);
// 	c.strokeStyle = getRandomColor();
// 	c.stroke();
// }

var mouse = {
	x: undefined,
	y: undefined
};

var maxRadius = 40;
// var minRadius = 5;

/*var colorArray = [
	'#D98BA0',
	'#D97398',
	'#D9669B',
	'#8878BF',
	'#D9A9A9',
];*/

var colorArray = [
	'#F8F9FB',
	'#E1F2F9',
	'#C3EAF1',
	'#A4D4E8',
	'#7BBBD6',
];

window.addEventListener('mousemove',
	function(event) {
		mouse.x = event.x;
		mouse.y = event.y;
		console.log(mouse);
	});

window.addEventListener('resize', function()
	{
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});


function Circle(x, y, radius, dx, dy) {
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.minRadius = radius;
	this.dx = dx;
	this.dy = dy;
	this.color = colorArray[Math.floor(Math.random()* colorArray.length)];

	this.draw = function() {
		c.beginPath();
		c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		// c.strokeStyle = 'rgba(0, 125, 215, 1)';
		// c.stroke();
		// c.fillStyle = 'rgba(100, 190, 255, 0.5)';
		c.fillStyle = this.color;
		c.fill();
	}

	this.update = function() {
		if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
			this.dx = -this.dx;
		}

		if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
			this.dy = -this.dy;
		}

		this.x += this.dx;
		this.y += this.dy;

		//interactivity
		if (mouse.x - this.x < 100 && mouse.x - this.x > -100
			&& mouse.y - this.y < 100 && mouse.y - this.y > -100
			) {
			if (this.radius < maxRadius) {
				this.radius += 1;
			}
			
		} else if (this.radius > this.minRadius) {
			this.radius -= 1;
		}

		this.draw();
	}
}

var circleArray = [];

function init () {

	circleArray = [];

	for (var i = 0; i < 800; i++) {

		var radius = Math.random() * 3 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5) * 2;
		var dy = (Math.random() - 0.5) * 2;

		circleArray.push(new Circle(x, y, radius, dx, dy));
	} 
}

function animate() {
	requestAnimationFrame(animate);

	c.clearRect(0, 0, innerWidth, innerHeight);

	for (var i = 0; i < circleArray.length; i++) {

		circleArray[i].update();
	}

}

init();
animate();