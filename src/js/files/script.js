// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

// let ManifestoItem = document.querySelectorAll('.manifesto__item');

var btns = document.getElementsByClassName("manifesto__item");
for (var i = 0; i < btns.length; i++) {
  btns[i].addEventListener("mouseenter", function() {
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", " active");
    this.className += " active";
  });
}
