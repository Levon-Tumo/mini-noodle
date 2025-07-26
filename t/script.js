const formEl = document.getElementById("form");
const inputEl = document.getElementById("input");
const resultsEl = document.getElementById("results");
const loadMoreBtn = document.getElementById("load-more");

let page = 1;
const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

formEl.addEventListener("submit", event => {
  event.preventDefault();
  page = 1;
  resultsEl.innerHTML = "";
  fetchImages();
});

loadMoreBtn.addEventListener("click", () => {
  page++;
  fetchImages();
});

async function fetchImages() {
  const query = inputEl.value.trim();

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${encodeURIComponent(query)}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!data.results.length) {
      if (page === 1) {
        resultsEl.innerHTML = "<p>No results found.</p>";
      }
      loadMoreBtn.style.display = "none";
      return;
    }

    displayResults(data.results);

  
    loadMoreBtn.style.display = (page < data.total_pages) ? "block" : "none";

  } catch (error) {
    console.error("Error fetching images:", error);
    alert("Something went wrong. Please try again later.");
  }
}

function displayResults(images) {
  images.forEach(image => {
    const { regular } = image.urls;
    const description = image.alt_description || "No description";
    const link = image.links.html;

    const card = document.createElement("div");
    card.className = "result-item";

    const img = document.createElement("img");
    img.className = "image";
    img.src = regular;
    img.alt = description;

    const anchor = document.createElement("a");
    anchor.className = "description";
    anchor.href = link;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";
    anchor.textContent = description;

    card.append(img, anchor);
    resultsEl.appendChild(card);
  });
}
