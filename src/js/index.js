require("../scss/style.scss");
require("../index.html");

import { MDCDrawer } from "@material/drawer";
import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";
import { getCorrectEventName } from "@material/animation";

import User from "./modules/user";
import Lesson from "./modules/lesson";
import Speech from "./modules/speech";

var user = User();
var lessons = [
  {
    url: "https://raw.githubusercontent.com/shlchoi/kana/master/hiragana.json"
  },
  {
    url: "https://raw.githubusercontent.com/shlchoi/kana/master/hiragana.json"
  }
];

document.addEventListener("DOMContentLoaded", function() {
  drawerUtility();
  //getUsername();
});
window.speechSynthesis.onvoiceschanged = function() {
  Speech.getVoice();
};
function getUsername() {
  const dialog = MDCDialog.attachTo(document.querySelector(".mdc-dialog"));
  const dialogButton = document.querySelector(".dialog-button");
  const dialogUsername = document.querySelector(".dialog-username");
  dialogButton.addEventListener("click", function() {
    user.setName(dialogUsername.value);
    document.querySelector("#drawer-username").innerHTML =
      user.getName() || "ゆうじん";
  });
  dialog.open();
  new MDCTextField(document.querySelector(".mdc-text-field")); //Fix in Future
}

function drawerUtility() {
  const modalButton = document.querySelector(".showModal");
  const modalButtons = document.querySelectorAll(".list-button");
  const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
  modalButton.addEventListener("click", function() {
    drawer.open = true;
  });
  for (let i = 0; i < modalButtons.length; i++) {
    modalButtons[i].addEventListener("click", function() {
      const content = this.nextElementSibling;
      [...content.children].forEach(item => {
        item.addEventListener("click", function(event) {
          showLesson(lessons[i]);
          drawer.open = false;
        });
      });
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

function showLesson(lesson) {
  let lessonData = Lesson.load(lesson.url);
  const cardBox = document.querySelector(".mdc-card");
  const card = document.querySelector("#card");
  const cardBtn1 = document.querySelector("#cardBtn1");
  const cardBtn2 = document.querySelector("#cardBtn2");
  const cardBtnSound = document.querySelector("#cardBtnSound");
  cardBox.classList.add("mdc-card--open");
  lessonData.then(data => {
    let x = data.getData();
    let sum = x.length - 1;
    let i = 0;
    var front = true;
    card.textContent = x[i].character;
    cardBtnSound.addEventListener("click", function() {
      Speech.speak(x[i].character);
    });
    card.addEventListener("click", function() {
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
