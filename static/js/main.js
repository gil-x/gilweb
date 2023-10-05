// Menu

const mainMenu = document.querySelector(".nav");
const animation = document.querySelector(".intro__animation");
const submenu = document.querySelector(".submenu");

const toggleMobileMenu = () => {
  mainMenu.classList.toggle("visible");
  document.body.classList.toggle("no-scroll");
  animation.classList.toggle("up");
};

const isTouchDevice = () => {
  if ("ontouchstart" in document.documentElement) {
    return true;
  }
  return false;
};

document.addEventListener("click", (event) => {
  if (event.target.classList.contains("head__menu__icon")) {
    toggleMobileMenu();
  } else if (
    event.target.classList.contains("with-child") &&
    mainMenu.classList.contains("visible")
    // && !isTouchDevice()
  ) {
    event.preventDefault();
    submenu.classList.toggle("visible");

    if (isTouchDevice()) {
      submenu.classList.toggle("open");
    }
  }
});

function submitForm() {
  var formData = new FormData(document.getElementById("myForm"));
  // console.log("fetching…");

  const dialog = document.querySelector(".dialog");
  // var dialogText = ``;

  dialog.classList.remove("visible");
  dialog.classList.remove("problem");
  dialog.innerHTML = "";

  fetch("/php/target.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((data) => {
      // console.log("get response….");
      dialog.classList.add("visible");
      if (data === "Success") {
        // All is fine
        let p0 = document.createElement("p");
        p0.appendChild(document.createTextNode(`Merci pour votre message !`));
        dialog.appendChild(p0);
        // dialogText += `Merci pour votre message !`;
      }

      if (
        data === "Error 1" ||
        data === "Error 3" ||
        data === "Error 5" ||
        data === "Error 7"
      ) {
        // Id Error
        dialog.classList.add("problem");
        const idFields = [
          document.getElementById("firstname"),
          document.getElementById("lastname"),
          document.getElementById("company"),
          document.getElementById("website"),
        ];
        idFields.forEach((el) => {
          el.classList.add("error");
        });
        idFields.forEach((el) => {
          el.addEventListener("focus", (event) => {
            idFields.forEach((el) => {
              el.classList.remove("error");
            });
          });
        });
        let p1 = document.createElement("p");
        p1.appendChild(
          document.createTextNode(
            `=> Merci de remplir au moins l'un des champs suivants : Nom, Prénom, Société, Site web actuel.`
          )
        );
        dialog.appendChild(p1);
        // dialogText += `=> Merci de remplir au moins l'un des champs suivants : Nom, Prénom, Société, Site web actuel.\n`;
      }

      if (
        data === "Error 2" ||
        data === "Error 3" ||
        data === "Error 6" ||
        data === "Error 7"
      ) {
        // Email Error
        dialog.classList.add("problem");
        const emailField = document.getElementById("email");
        emailField.classList.add("error");
        emailField.addEventListener("focus", (event) => {
          event.target.classList.remove("error");
        });
        let p2 = document.createElement("p");
        p2.appendChild(
          document.createTextNode(
            `=> Merci de renseigner une adresse email correcte.`
          )
        );
        dialog.appendChild(p2);
        // dialogText += `=> Merci de renseigner une adresse email correcte.\n`;
      }

      if (
        data === "Error 4" ||
        data === "Error 5" ||
        data === "Error 6" ||
        data === "Error 7"
      ) {
        // Message Error
        dialog.classList.add("problem");
        const messageField = document.getElementById("message");
        messageField.classList.add("error");
        messageField.addEventListener("focus", (event) => {
          event.target.classList.remove("error");
        });
        let p3 = document.createElement("p");
        p3.appendChild(
          document.createTextNode(
            `=> Il manque un message, cela va être compliqué de comprendre vos attentes !`
          )
        );
        dialog.appendChild(p3);
        // dialogText += `=> Il manque un message, cela va être compliqué de comprendre vos attentes !\n`;
      }
      // var para = document.createElement('p');
      // dialog.appendChild(document.createTextNode(dialogText));

      // alert(data);
    })
    .catch((error) => {
      console.error("Erreur lors de la soumission du formulaire:", error);
    });
}
