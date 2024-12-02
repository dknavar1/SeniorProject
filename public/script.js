// Toggle menu
function toggleMenu() {
  const menu = document.getElementById("navbar-default");
  menu.classList.toggle("hidden");
}

const recipesContainer = document.getElementById('recipes-container');

// Get the recipe ID from the URL
document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const recipeId = urlParams.get('recipe');

  if (!recipeId) {
    console.error('Recipe ID not provided in the URL');
    return;
  }

  // URL of JSON file
  const jsonUrl = 'recipes.json';

  // Fetch recipes from the JSON file and get specific recipe
  fetch(jsonUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const recipe = data[recipeId];
      if (recipe) {
        // Clear the container and display only the selected recipe details
        recipesContainer.innerHTML = '';
        updateBannerImage(recipe.image); 
        showRecipeDetails(recipe);
      } else {
        console.error('Recipe not found');
      }
    })
    .catch(error => console.error('Error fetching recipes:', error));
});

// Function to update the banner image
function updateBannerImage(imageUrl) {
  const bannerImg = document.getElementById('banner-image');
  if (bannerImg) {
    bannerImg.src = imageUrl;
  }
}

// Function to show recipe details with updated layout
function showRecipeDetails(recipe) {
  // Clear content
  recipesContainer.innerHTML = '';

  const detailCard = document.createElement('div');
  detailCard.classList.add('bg-white', 'dark:bg-gray-800', 'rounded-lg', 'shadow-md', 'p-6', 'flex', 'flex-wrap');

  // Recipe Image
  const imageSection = document.createElement('div');
  imageSection.classList.add('w-full', 'lg:w-1/3', 'px-4', 'mb-6', 'lg:mb-0');

  // Wrapper
  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('relative', 'pb-[100%]', 'overflow-hidden', 'rounded-lg');

  // Image inside wrapper
  const image = document.createElement('img');
  image.src = recipe.image; // Make sure your JSON file has correct paths like "images/souffle.png"
  image.alt = recipe.name;
  image.classList.add('absolute', 'top-0', 'left-0', 'w-full', 'h-full', 'object-cover');

  imageWrapper.appendChild(image);
  imageSection.appendChild(imageWrapper);
  detailCard.appendChild(imageSection);

  // Recipe Content
  const contentSection = document.createElement('div');
  contentSection.classList.add('w-full', 'lg:w-2/3', 'px-4');

  // Recipe Title
  const title = document.createElement('h2');
  title.textContent = recipe.name;
  title.classList.add('text-2xl', 'font-bold', 'text-gray-900', 'dark:text-white');
  contentSection.appendChild(title);

  // Recipe Description
  const description = document.createElement('p');
  description.textContent = recipe.description;
  description.classList.add('text-gray-700', 'dark:text-gray-300', 'mt-4');
  contentSection.appendChild(description);

  // Ingredient List
  const ingredientsTitle = document.createElement('h3');
  ingredientsTitle.textContent = 'Ingredients';
  ingredientsTitle.classList.add('text-xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'mt-6', 'mb-2');
  contentSection.appendChild(ingredientsTitle);

  const ingredientsList = document.createElement('ul');
  ingredientsList.classList.add('list-none', 'ml-6', 'text-gray-700', 'dark:text-gray-300');
  recipe.ingredients.forEach(ingredient => {
    const li = document.createElement('li');
    li.classList.add('flex', 'items-center', 'mb-4', 'rounded-lg');

    // Checkbox styling
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.classList.add('h-5', 'w-5', 'mr-4');
    checkbox.style.accentColor = '#36454F'; // Custom charcoal color for the checkmark

    // Label for the ingredient
    const label = document.createElement('label');
    label.textContent = ingredient;
    label.classList.add('text-gray-900', 'dark:text-white'); // Ensuring text color is styled properly

    // Append elements to list item
    li.appendChild(checkbox);
    li.appendChild(label);
    ingredientsList.appendChild(li);
  });
  contentSection.appendChild(ingredientsList);

  // Instructions
  const instructionsTitle = document.createElement('h3');
  instructionsTitle.textContent = 'Instructions';
  instructionsTitle.classList.add('text-xl', 'font-bold', 'text-gray-900', 'dark:text-white', 'mt-6');
  contentSection.appendChild(instructionsTitle);

  const instructionsList = document.createElement('ol');
  instructionsList.classList.add('list-decimal', 'list-inside', 'ml-6', 'text-gray-700', 'dark:text-gray-300');
  recipe.instructions.forEach(instruction => {
    const li = document.createElement('li');
    li.textContent = instruction;
    instructionsList.appendChild(li);
  });
  contentSection.appendChild(instructionsList);

  detailCard.appendChild(contentSection);
  recipesContainer.appendChild(detailCard);
}