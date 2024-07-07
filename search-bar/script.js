document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("search-bar");
  const resultsContainer = document.getElementById("results");

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.trim().toLowerCase();

    if (query.length > 0) {
      fetch("https://fakestoreapi.com/products")
        .then((response) => response.json())
        .then((data) => {
          const filteredItems = data.filter((item) => {
            return item.title.toLowerCase().includes(query);
          });

          displayResults(filteredItems)
        });
    }
  });

  function displayResults(items) {
    resultsContainer.innerHTML = "";

    items.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.classList.add("item");

      itemDiv.innerHTML = `
            <img src="${item.image}" />
            <h3>${item.title}</h3>
            <p>${item.price}</p>
        `;

      resultsContainer.appendChild(itemDiv);
    });
  }
});
