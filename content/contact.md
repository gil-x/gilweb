+++
title = "Contactez-moi"
template = "page.html"
slug = "contact"

[extra]
menu = "contact"
meta_title = "Gil-web.com | Formulaire de contact"
meta_description = "Gil-web.com - Gino Ladowitch | Formulaire de contact | Demande de devis | Droits d'auteur."
+++

<p class="centered">Laissez-moi un petit mot pour m'expliquer vos attentes, et je répondrai quoi qu'il arrive.</p>

<div class="dialog"></div>

<form class="form" id="myForm" autocomplete="on">
  <div class="form__side">
    <h2 class="form__title h2">Vous êtes…</h2>
    <p class="form__field">
      <label class="form__field--label" for="firstname">Prénom :</label>
      <input class="form__field--input" id="firstname" type="text" name="firstname" value=""/>
    </p>
    <p class="form__field">
      <label class="form__field--label" for="lastname">Nom :</label>
      <input class="form__field--input" id="lastname" type="text" name="lastname" value="" />
    </p>
    <p class="form__field">
      <label class="form__field--label" for="company">Société :</label>
      <input class="form__field--input" id="company" type="text" name="company" value="" autocomplete="off" />
    </p>
    <p class="form__field">
      <label class="form__field--label" for="website">Site web actuel :</label>
      <input class="form__field--input" id="website" type="text" name="website" value="" />
    </p>
    <p class="form__field">
      <label class="form__field--label" for="email">Email* :</label>
      <input class="form__field--input" id="email" type="email" name="email" value="" autocomplete="on"/>
    </p>
  </div>
  <div class="form__side">
    <h2 class="form__title h2">Objet de votre message</h2>
    <ul class="form__list">
      <li class="form__list--item">
        <input type="checkbox" name="estimate" id="estimate" />&nbsp;<label
          for="estimate"
          >Demande de devis</label
        >
      </li>
      <li class="form__list--item">
        <input type="checkbox" name="collaboration" id="collaboration" />&nbsp;<label
          for="collaboration"
          >Proposition de collaboration</label
        >
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
        <input type="checkbox" name="other" id="other" />&nbsp;<label
          for="other"
          >Autre</label
        >
      </li>
      <li class="form__list--item">
        <input type="checkbox" name="personnal" id="personnal" />&nbsp;<label
          for="personnal"
          >Personnel</label
        >
      </li>
    </ul>
    <h3 class="h3">Message</h3>
    <textarea id="message" class="form__textarea" name="message" rows="10" cols="40"></textarea>
  </div>

  <div class="form__send">
    <button class="form__send--submit" type="button" id="submit" onclick="submitForm()">Envoyer</button>
  </div>
</form>
