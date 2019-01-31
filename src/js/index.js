require("../scss/style.scss");
require("../index.html");

import { MDCDrawer } from "@material/drawer";
import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

import User from "./modules/user";
import Lesson from "./modules/lesson";
import Speech from "./modules/speech";

document.addEventListener("DOMContentLoaded", function() {
  let modalButton = document.querySelector(".showModal");
  const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
  modalButton.addEventListener("click", function() {
    drawer.open = true;
  });
  drawerUtility();
  getUsername();
  showLesson();
  Speech.getVoice();
});
window.speechSynthesis.onvoiceschanged = function() {
  Speech.getVoice();
};
function getUsername() {
  const dialog = MDCDialog.attachTo(document.querySelector(".mdc-dialog"));
  const dialogButton = document.querySelector(".dialog-button");
  const dialogUsername = document.querySelector(".dialog-username");
  dialogButton.addEventListener("click", function() {
    let user = new User(dialogUsername.value);
    document.querySelector("#drawer-username").innerHTML =
      user.getName() || "ゆうじん";
  });
  dialog.open();

  new MDCTextField(document.querySelector(".mdc-text-field"));
}

function drawerUtility() {
  const modalButtons = document.querySelectorAll(".list-button");
  for (let i = 0; i < modalButtons.length; i++) {
    modalButtons[i].addEventListener("click", function() {
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

function showLesson() {
  let lessonData = Lesson.load(
    "https://raw.githubusercontent.com/shlchoi/kana/master/hiragana.json"
  );
  const card = document.querySelector("#card");
  const cardBtn1 = document.querySelector("#cardBtn1");
  const cardBtn2 = document.querySelector("#cardBtn2");

  lessonData.then(data => {
    let x = data.getData();
    let sum = x.length - 1;
    let i = 0;
    var front = true;
    card.textContent = x[i].character;
    card.addEventListener("click", function() {
      Speech.speak(x[i].character);
      if (front) {
        card.textContent = x[i].romanization;
        front = !front;
      } else {
        card.textContent = x[i].character;
        front = !front;
      }
    });
    cardBtn1.addEventListener("click", function() {
      if (i !== 0) {
        i--;
      } else {
        i = sum;
      }
      card.textContent = x[i].character;
    });
    cardBtn2.addEventListener("click", function() {
      if (i !== sum) {
        i++;
      } else {
        i = 0;
      }
      card.textContent = x[i].character;
    });
  });
}
