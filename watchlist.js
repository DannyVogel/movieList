const watchlist = JSON.parse(localStorage.getItem("watchlist"))

const resultsContainerEl = document.getElementById('results-container')
const mainContainerEl = document.getElementById('main-container')

mainContainerEl.style.justifyContent = 'flex-start'

console.log(watchlist)

watchlist && watchlist.forEach(movie => {
    let movieHtml = `
        <div class="movie-result-container">
            <div class="poster-container">
                <img src="${movie.poster}" alt="">
            </div>

            <div class="movie-details-container">
                <div class="movie-header-container">
                    <h1 class="movie-title">${movie.title}</h1>
                    <i class="fa-solid fa-star"></i>
                    <p class="rating">${movie.rating}</p>
                </div>

                <div class="movie-info-container">
                    <p class="runtime-txt">${movie.runtime}</p>
                    <p class="categories-txt">${movie.genre}</p>
                    <div class="watchlist-container" data-movie-id="${movie.id}">
                        <i data-movie-id="${movie.id}" class="fa-solid fa-circle-plus"></i>
                        <p data-movie-id="${movie.id}" class="watchlist-txt">Watchlist</p>
                    </div>
                </div>

                <div class="movie-summary-container">
                    <p class="movie-summary-text">${movie.plot}</p>
                </div>
            </div>
        </div>
        `
    resultsContainerEl.innerHTML += movieHtml
})