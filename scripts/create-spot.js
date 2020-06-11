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
    citySelect.setAttribute("disabled", null);
  }

  fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`,
  )
    .then((response) => response.json())
    .then((cities) => {
      citySelect.innerHTML = `<option value="">Selecione a cidade</option>`;

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
