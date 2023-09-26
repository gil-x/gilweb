// Menu

const mainMenu = document.querySelector(".nav");
const animation = document.querySelector(".animation");
const submenu = document.querySelector(".submenu");

const toggleMobileMenu = () => {
  mainMenu.classList.toggle("visible");
  document.body.classList.toggle("no-scroll");
  animation.classList.toggle("up");
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("head__menu__icon")) {
    toggleMobileMenu();
  } else if (event.target.classList.contains("with-child")) {
    event.preventDefault();
    submenu.classList.toggle("visible");
  }
});
