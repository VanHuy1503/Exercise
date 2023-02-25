var comboboxs = document.querySelectorAll(".combobox");

comboboxs.forEach(function (el) {
    let selecteContent = el.querySelector(".combobox__select");
    let combobox__btn = el.querySelector(".combobox__btn");
    let menuOptions = el.querySelector(".options");
    let options = el.getElementsByClassName("option");
    combobox__btn.onclick = function () {
        selecteContent.classList.toggle("border-focus");
        menuOptions.classList.toggle("hidden");
        combobox__btn.classList.toggle("rotate-180");
    };
    for (const opt of options) {
        opt.onclick = function () {
            selecteContent.innerText = event.target.textContent;
            selecteContent.classList.toggle("border-focus");
            menuOptions.classList.toggle("hidden");
            combobox__btn.classList.toggle("rotate-180");
        };
    }
});
