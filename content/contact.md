+++
title = "Contactez-moi"
template = "page.html"

[extra]
menu = "contact"
+++

<form class="form" id="myForm">
  <div class="form__side">
    <h2 class="form__title h2">Vous êtes...</h2>
    <p class="form__field">
      <label class="form__field--label" for="firstname">Prénom :</label>
      <input class="form__field--input" type="text" name="firstname" value="" />
    </p>
    <p class="form__field">
      <label class="form__field--label" for="lastname">Nom :</label>
      <input class="form__field--input" type="text" name="lastname" value="" />
    </p>
    <p class="form__field">
      <label class="form__field--label" for="company">Société :</label>
      <input class="form__field--input" type="text" name="company" value="" />
    </p>
    <p class="form__field">
      <label class="form__field--label" for="website">Site web actuel :</label>
      <input class="form__field--input" type="text" name="website" value="" />
    </p>
    <p class="form__field">
      <label class="form__field--label" for="email">Email* :</label>
      <input class="form__field--input" type="email" name="email" value="" />
    </p>
  </div>
  <div class="form__side">
    <h2 class="form__title h2">Objet de votre message</h2>
    <ul class="form__list">
      <li class="form__list--item">
        <input type="checkbox" name="devis" id="devis" />&nbsp;<label
          for="devis"
          >Demande de devis</label
        >
      </li>
      <li class="form__list--item">
        <input
          type="checkbox"
          name="collaboration"
          id="collaboration"
        />&nbsp;<label for="collaboration">Proposition de collaboration</label>
      </li>
      <li class="form__list--item">
        <input type="checkbox" name="copyright" id="copyright" />&nbsp;<label
          for="copyright"
          >Droits d'auteur</label
        >
      </li>
      <li class="form__list--item">
        <input type="checkbox" name="question" id="question" />&nbsp;<label
          for="question"
          >Question</label
        >
      </li>
      <li class="form__list--item">
        <input type="checkbox" name="other" id="autre" />&nbsp;<label
          for="other"
          >Autre</label
        >
      </li>
      <li class="form__list--item">
        <input type="checkbox" name="personnal" id="autre" />&nbsp;<label
          for="personnal"
          >Personnel</label
        >
      </li>
    </ul>
    <h3 class="h3">Message</h3>
    <textarea class="form__textarea" name="message" rows="10" cols="40"></textarea>
  </div>

  <div class="form__send">
    <button class="form__send--submit" id="submit" onclick="submitForm()">envoyer</button>
  </div>
  <!-- <input class="form__hidden" type="hidden" name="phase" value="traitement" /> -->
</form>
