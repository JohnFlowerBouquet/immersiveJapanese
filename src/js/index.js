require("../scss/style.scss");
require("../index.html");

import { MDCDrawer } from "@material/drawer";
import { MDCDialog } from "@material/dialog";
import { MDCTextField } from "@material/textfield";

import User from "./modules/user";

document.addEventListener("DOMContentLoaded", function() {
  let modalButton = document.querySelector(".showModal");
  const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));
  modalButton.addEventListener("click", function() {
    drawer.open = true;
  });
  getUsername();
});

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

const modalButtons = document.querySelectorAll(".list-button");

var i;

for (i = 0; i < modalButtons.length; i++) {
  modalButtons[i].addEventListener("click", function() {
    //this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
}
