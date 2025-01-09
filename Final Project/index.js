var apiBaseUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

        var searchInput = document.getElementById("searchInput");
        var searchButton = document.getElementById("searchButton");
        var resultsContainer = document.getElementById("results");
        var showAllButton = document.getElementById("showAllButton");

        var allMeals = [];

        searchButton.addEventListener("click", () => {
            var query = searchInput.value.trim();
            if (!query) return;

            fetch(`${apiBaseUrl}${query}`)
                .then(response => response.json())
                .then(data => {
                    if (data.meals) {
                        allMeals = data.meals;
                        displayMeals(allMeals.slice(0, 5));
                        if (allMeals.length > 5) {
                            showAllButton.classList.remove("d-none");
                        } else {
                            showAllButton.classList.add("d-none");
                        }
                    } else {
                        resultsContainer.innerHTML = "<p class='no-results'>No meals found.</p>";
                        showAllButton.classList.add("d-none");
                    }
                });
        });

        showAllButton.addEventListener("click", () => {
            displayMeals(allMeals);
            showAllButton.classList.add("d-none");
        });

        function displayMeals(meals) {
            resultsContainer.innerHTML = meals.map(meal => `
                <div class="col-md-4">
                    <div class="card meal-card">
                        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">${meal.strMeal}</h5>
                            <p class="card-text">${meal.strInstructions.slice(0, 100)}...</p>
                            <p><strong>ID:</strong> ${meal.idMeal}</p>
                        </div>
                    </div>
                </div>
            `).join("");
        }