// Menu

const mainMenu = document.querySelector(".nav");
const animation = document.querySelector(".intro__animation");
const submenu = document.querySelector(".submenu");

const toggleMobileMenu = () => {
  mainMenu.classList.toggle("visible");
  document.body.classList.toggle("no-scroll");
  animation.classList.toggle("up");
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("head__menu__icon")) {
    toggleMobileMenu();
  } else if (
    event.target.classList.contains("with-child") &&
    mainMenu.classList.contains("visible")
  ) {
    event.preventDefault();
    submenu.classList.toggle("visible");
  }
});

function submitForm() {
  var formData = new FormData(document.getElementById("myForm"));

  // Utilisation de la méthode fetch
  console.log("fetching...");
  fetch("https://zola.gil-web.com/php/target.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // Afficher la réponse dans la console ou dans une boîte de dialogue
      console.log("get response...");
      console.log(data);
      // alert(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la soumission du formulaire:", error);
    });
}
