var canvas = document.querySelector("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// function reportWindowSize() {
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;
//   console.log(canvas.width, canvas.height);
// }

var context = canvas.getContext("2d");
var lStart = 50;
var lEnd = 200;
var yStart = 20;
context.beginPath();
context.lineWidth = 3;
context.beginPath();
context.lineJoin = "round";
context.strokeStyle = "rgba(255,0,0,0.5)";
context.moveTo(50, 140);
context.lineTo(150, 140);
context.lineTo(150, 260);
context.stroke();

// window.onresize = reportWindowSize;
function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top,
  };
}

class Circle {
  constructor(xPoint, yPoint, radius, color) {
    this.xPoint = xPoint;
    this.yPoint = yPoint;
    this.radius = radius;
    this.color = color;
    this.originalColor = color;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.xPoint, this.yPoint, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }

  mouseOver(mouseX, mouseY) {
    var distance = Math.sqrt(
      (mouseX - this.xPoint) * (mouseX - this.xPoint) +
        (mouseY - this.yPoint) * (mouseY - this.yPoint)
    );

    if (distance < this.radius) {
      this.color = "red";
      this.yPoint = mouseY;
      this.xPoint = mouseX;
      this.draw(context);
    } else {
      this.color = this.originalColor;
      this.draw(context);
    }
  }
}

const circle = new Circle(100, 100, 20, "rgb(56,100,45, 1)");
circle.draw(context);

onmousemove = function (evt) {
  var mousePos = getMousePos(canvas, evt);
  circle.mouseOver(mousePos.x, mousePos.y);
};
