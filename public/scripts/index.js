const modal = document.querySelector("#modal");
const buttonOpen = document.querySelector("#page-home main a");
const buttonClose = document.querySelector("#modal .header a");

buttonOpen.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

buttonClose.addEventListener("click", () => {
  modal.classList.add("hidden");
});
