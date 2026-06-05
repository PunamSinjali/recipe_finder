const hardcodedRecipes = [
  {
    idMeal: "2",
    strMeal: "Keema Noodles",
    strCategory: "chicken",
    strMealThumb:
      "https://www.recipetineats.com/tachyon/2024/08/Hokkien-noodles-with-chicken_2.jpg?resize=1200%2C1500&zoom=0.86",
  },
  {
    idMeal: "3",
    strMeal: "Laphing",
    strCategory: "chicken",
    strMealThumb:
      "https://www.recipetineats.com/tachyon/2024/08/Hokkien-noodles-with-chicken_2.jpg?resize=1200%2C1500&zoom=0.86",
  },
];

const resultsSection = document.getElementById("results-section");
const resultsCount = document.getElementById("results-count");
const resultsGrid = document.getElementById("results-grid");

function createRecipeCard(recipe) {
  return `
  <div class="recipe-card">
  <img
    src="${recipe.strMealThumb}"
    alt="${recipe.strMeal}"
    class="card-photo"
  />

  <div class="card-body">
    <div class="card-name">${recipe.strMeal}</div>
    <div class="card-category">${recipe.strCategory}</div>
    <div class="card-footer">
      <button
        class="btn-save"
        onclick="
          saveRecipe(
            '${recipe.idMeal}',
            '${recipe.strMeal}',
            '${recipe.strCategory}',
            '${recipe.strMealThumb}',
          )
        "
      >
        Save Recipe
      </button>
    </div>
  </div>
</div>

  `;
}

function showResults(recipes) {
  resultsSection.style.display = "block";
  resultsCount.textContent = `${recipes.length} recipes found`;

  let html = "";
  for (let recipe of recipes) {
    html += createRecipeCard(recipe);
  }
  resultsGrid.innerHTML = html;
}
// showResults(hardcodedRecipes);

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const searchError = document.getElementById("search-error");

// fetching data takes time so async make the function wait until data is updated
const searchRecipes = async (query) => {
  const trimmed = query.trim();
  if (trimmed === "") {
    searchError.textContent = "please type something to search for";
    searchError.style.display = "block";
    return;
  }

  searchError.style.display = "none";
  searchBtn.textContent = "searching...";

  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${trimmed}`,
    );

    const data = await response.json();
    searchBtn.textContent = "find recipes";
    if (!data.meals) {
      searchError.textContent = `try something else no result for "${trimmed}". try another search`;
      searchError.style.display = "block";
      resultsSection.style.display = "none";
      return;
    }

    showResults(data.meals);
  } catch (error) {
    searchBtn.textContent = "find recipes";
    searchError.textContent =
      "something went wrong. check your internet connection";
    searchError.style.display = "block";
    console.error(error);
  }
};

searchBtn.addEventListener("click", () => {
  searchRecipes(searchInput.value);
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchRecipes(searchInput.value);
  }
});

let savedRecipes = [];
const savedSection = document.getElementById("saved-section");
const savedDivider = document.getElementById("section-divider");
const savedGrid = document.getElementById("saved-grid");
const savedCount = document.getElementById("saved-count");
const savedLabel = document.getElementById("saved-label");

function createSavedCard(recipe) {
  return `
  <div class="recipe-card">
           <img class="card-photo"
                src="${recipe.strMealThumb}"
                alt="${recipe.strMeal}" />
           <div class="card-body">
               <div class="card-name">${recipe.strMeal}</div>
               <div class="card-category">${recipe.strCategory}</div>
               <div class="card-footer">
                   <button class="btn-remove"
                       onclick="removeRecipe('${recipe.idMeal}')">
                       Remove
                   </button>
               </div>
           </div>
       </div>
  `;
}

function showSaved() {
  if (savedRecipes.length === 0) {
    savedSection.style.display = "none";
    savedDivider.style.display = "none";
    savedCount.textContent = "0";
    return;
  }

  savedSection.style.display = "block";
  savedDivider.style.display = "block";
  savedCount.textContent = savedRecipes.length;
  savedLabel.textContent = `${savedRecipes.length} saved`;

  let html = "";
  for (let recipe of savedRecipes) {
    html += createSavedCard(recipe);
  }
  savedGrid.innerHTML = html;
}

function saveToStorage() {
  localStorage.setItem("flavour-saved", JSON.stringify(savedRecipes));
}

function loadFromStorage() {
  const stored = localStorage.getItem("flavour-saved");
  if (stored) {
    savedRecipes = JSON.parse(stored);
  }
}

function saveRecipe(id, name, category, thumb) {
  const recipe = {
    idMeal: id,
    strMeal: name,
    strCategory: category,
    strMealThumb: thumb,
  };

  savedRecipes.push(recipe);
  saveToStorage();
  showSaved();
  savedSection.scrollIntoView({ behavior: "smooth" });
}

function removeRecipe(id) {
  const position = savedRecipes.findIndex((recipe) => recipe.idMeal === id);
  if (position !== -1) {
    savedRecipes.splice(position, 1);
  }
  showSaved();
  saveToStorage();
}

loadFromStorage();

if (savedRecipes.length > 0) {
  showSaved();
}