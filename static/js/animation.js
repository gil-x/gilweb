// console.log("Animation script loaded");

const pupil = document.getElementById("pupil");
const eyeLiderTop = document.getElementById("eyelider-top");
const eyeLiderBottom = document.getElementById("eyelider-bottom");

Array.prototype.sample = function () {
  return this[Math.floor(Math.random() * this.length)];
};

/**
 * Add a class to DOM element.
 * Remove the class after <lifetime> ms.
 * @param {Node} element
 * @param {String} className
 * @param {Number} lifetime
 */
const classSheduler = (element, className, lifetime) => {
  element.classList.add(className);
  setTimeout(() => {
    element.classList.remove(className);
  }, lifetime);
};

const blink = () => {
  classSheduler(eyeLiderTop, "blink-top", 200);
  classSheduler(eyeLiderBottom, "blink-bottom", 200);
};

const blinkX2 = () => {
  classSheduler(eyeLiderTop, "blink-top-x2", 500);
  classSheduler(eyeLiderBottom, "blink-bottom-x2", 500);
};

const lookRight = () => {
  classSheduler(pupil, "look-right", 2000);
  classSheduler(eyeLiderTop, "blink-top-slow", 2000);
};

const lookDown = () => {
  classSheduler(pupil, "look-down", 2000);
  classSheduler(eyeLiderTop, "blink-top-slow", 2000);
};

const animations = [blink, blinkX2, lookRight, lookDown];
// const animations = [ blinkX2];
// const animations = [ lookDown];

const pauseTimes = [1000, 3000, 3000, 5000, 5000];

const animationSheduler = () => {
  let pauseTime = pauseTimes.sample();

  setTimeout(animations.sample(), pauseTime);

  setTimeout(animationSheduler, pauseTime);
};

animationSheduler();

window.addEventListener("load", (event) => {
  const svg = document.getElementById("svg");
  if (svg) {
    setTimeout(() => {
      svg.classList.add("visible");
    }, 100);
  }
});
