function drawProducts() {
    let text = document.querySelector("#input").value;
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${text}`)
        .then(response => response.json())
        .then(data => {
            const results = document.querySelector(".results");
            results.innerHTML = "";

            const meals = data.meals;

            if (meals === null) {
                results.innerHTML = "<h3>Oops, we couldn't find that meal</h3>";
            } else {
                meals.forEach(prod => {
                    results.innerHTML +=
                        `<div class="body-card">
                            <img src="${prod.strMealThumb}" alt=${prod.strMeal} class="img-card">
                            <div class="content-card">
                                <h3 class="title-card">${prod.strMeal}</h3>
                                <button class="btn-card" onclick="showModal('${prod.idMeal}')">More information</button>
                            </div>
                        </div>`;
                });
            }
        });
}

function showModal(mealId) {
    // Hacer otra solicitud para obtener información detallada de la receta utilizando mealId
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => {
            const mealDetails = data.meals[0];

            const modal  = `
            <div class="modal">
            <div class="modal-content">
                <span class="close" onClick="closeModal()"">&times;</span>
                <h2>${mealDetails.strMeal}</h2>
                <img src="${mealDetails.strMealThumb}" alt=${mealDetails.strMeal} class="modal-img">
                <p>${mealDetails.strInstructions}</p>
            </div>
        </div>`

            document.body.insertAdjacentHTML('beforeend', modal);
        })
        .catch(error => console.log(error))
}

function closeModal(){
    const modal = document.querySelector(".modal")
    modal.parentNode.removeChild(modal);
}


const search = document.querySelector("#search").addEventListener("click", () => {
    drawProducts()
});

