const ufSelect = document.querySelector("select[name=uf]");
const citySelect = document.querySelector("select[name=city]");

function populateUFs(ufSelect) {
  fetch(
    "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome",
  )
    .then((response) => response.json())
    .then((ufs) => {
      ufs.forEach((uf) => {
        ufSelect.innerHTML += `<option value="${uf.sigla}">${uf.nome}</option>`;
      });
    });
}

function populateCities(event, citySelect) {
  if (!citySelect.hasAttribute("disabled")) {
    citySelect.setAttribute("disabled", true);
  }

  citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`,
  )
    .then((response) => response.json())
    .then((cities) => {
      cities.forEach((city) => {
        citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
      });

      if (citySelect.hasAttribute("disabled")) {
        citySelect.removeAttribute("disabled");
      }
    });
}

populateUFs(ufSelect);

ufSelect.addEventListener("change", (event) => {
  populateCities(event, citySelect);
});

const itemsToCollect = document.querySelectorAll(".items-grid li");
const collectedItems = document.querySelector("input[name=items]");

let selectedItems = [];

function handleSelectItem(event) {
  const itemLi = event.target;
  itemLi.classList.toggle("selected");

  const itemId = itemLi.dataset.id;
  const alreadySelected = selectedItems.findIndex((item) => {
    return item === itemId;
  });

  alreadySelected >= 0 ? selectedItems.pop(itemId) : selectedItems.push(itemId);
  collectedItems.value = selectedItems;
}

itemsToCollect.forEach((item) => {
  item.addEventListener("click", handleSelectItem);
});
