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
showResults(hardcodedRecipes);
