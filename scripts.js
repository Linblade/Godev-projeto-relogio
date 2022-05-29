const hoursHand = document.querySelector(".hand.hours");
const minutesHand = document.querySelector(".hand.minutes");
const secondsHand = document.querySelector(".hand.seconds");
const hoursDigital = document.querySelector(".digitalHour");
const minutesDigital = document.querySelector(".digitalMinute");
const secondsDigital = document.querySelector(".digitalSecond");
var dsp = document.getElementById("canvas");
var ctx = dsp.getContext("2d");
var can = document.querySelector("canvas");
can.style.position = "absolute";
can.style.top = "0px";
can.style.left = "0px";

dsp.height = window.innerWidth * 1.5;
dsp.width = window.innerWidth;

var numbersRain =
  "1001010101110101010101010010101000101011101111010101010110101010101010101110000101";
numbersRain = numbersRain.split("");

var font_size = 20;
var columns = dsp.width / font_size;
var drops = [];
for (var x = 0; x < columns; x++) drops[x] = 1;

const draw = () => {
  ctx.fillStyle = "rgba(255, 255, 255, 0.05)";
  ctx.fillRect(0, 0, dsp.width, dsp.height);

  ctx.fillStyle = "#666"; //green text
  ctx.font = font_size + "px arial";

  for (var i = 0; i < drops.length; i++) {
    var text = numbersRain[Math.floor(Math.random() * numbersRain.length)];

    ctx.fillText(text, i * font_size, drops[i] * font_size);

    if (drops[i] * font_size > dsp.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }
};

const setRotation = (element, rotationPercentage) => {
  element.style.setProperty("--rotation", rotationPercentage * 360);
};

const setClock = () => {
  const currentDate = new Date();

  const secondsPercentage = currentDate.getSeconds() / 60;
  const minutesPercentage = (secondsPercentage + currentDate.getMinutes()) / 60;
  const hoursPercentage = (minutesPercentage + currentDate.getHours()) / 12;

  setRotation(secondsHand, secondsPercentage);
  setRotation(minutesHand, minutesPercentage);
  setRotation(hoursHand, hoursPercentage);

  secondsDigital.textContent = zeroFilling(currentDate.getSeconds(), 2);
  minutesDigital.textContent = zeroFilling(currentDate.getMinutes(), 2);
  hoursDigital.textContent = zeroFilling(currentDate.getHours(), 2);
};

const zeroFilling = (number, quntity) => {
  var zero = "";
  for (var i = 0; i < quntity; i++) {
    zero += "0";
  }
  return (zero + number).slice(-quntity);
};

setClock();

setInterval(setClock, 1000);
setInterval(draw, 33);
