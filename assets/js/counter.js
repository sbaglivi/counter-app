let counter = document.createElement("h1");
counter.setAttribute("id", "counter");
counter.textContent = "0";
document.body.append(counter);
let increaseButton = document.createElement("button");
increaseButton.textContent = "+";
let decreaseButton = document.createElement("button");
decreaseButton.textContent = "-";
let buttonsDiv = document.createElement("div");
buttonsDiv.classList.add("buttons");
buttonsDiv.append(increaseButton);
buttonsDiv.append(decreaseButton);
document.body.append(buttonsDiv);

let currValue = getCookie() ?? 0;
if (currValue !== 0) {
  counter.textContent = currValue;
}
const baseFrequency = 500;
const startEvents = ["mousedown", "touchstart"];
const endEvents = [
  "mouseleave",
  "mouseup",
  "touchend",
  "touchmove",
  "touchcancel",
];

startEvents.forEach((startEvent) => {
  increaseButton.addEventListener(startEvent, function (e) {
    e.preventDefault();
    if (!this.held) {
      this.held = true;
      this.updateFrequency = baseFrequency;
      updateFrequencyAndCounter.call(this, "up");
    }
  });
  decreaseButton.addEventListener(startEvent, function (e) {
    e.preventDefault();
    if (!this.held) {
      this.held = true;
      this.updateFrequency = baseFrequency;
      updateFrequencyAndCounter.call(this, "down");
    }
  });
});

endEvents.forEach((endEvent) => {
  increaseButton.addEventListener(endEvent, function () {
    this.held = false;
    clearInterval(this.timeoutId);
  });
  decreaseButton.addEventListener(endEvent, function () {
    this.held = false;
    clearInterval(this.timeoutId);
  });
});

function updateFrequencyAndCounter(upOrDown) {
  updateCounter(upOrDown);
  this.timeoutId = setTimeout(
    updateFrequencyAndCounter.bind(this, upOrDown),
    this.updateFrequency
  );
  if (this.updateFrequency >= 125) this.updateFrequency /= 2;
}
function updateCounter(upOrDown) {
  upOrDown === "up" ? currValue++ : currValue--;
  setCookie();
  counter.textContent = currValue;
}
function setCookie() {
  let d = new Date();
  d.setTime(d.getTime() + 24 * 60 * 60 * 1000); // sets d time as 24h from now
  let expires = "expires=" + d.toUTCString();
  document.cookie = "counterValue=" + currValue + ";" + expires + ";path=/";
}
function getCookie() {
  let cookieName = "counterValue=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let cookieParts = decodedCookie.split(";");
  for (let i = 0; i < cookieParts.length; i++) {
    let cookiePart = cookieParts[i];
    while (cookiePart.charAt(0) === " ") {
      cookiePart = cookiePart.substring(1);
    }
    if (cookiePart.indexOf(cookieName) === 0) {
      return cookiePart.substring(cookieName.length, cookiePart.length);
    }
  }
}
