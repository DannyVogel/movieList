export default class Movie {
    constructor(data){
        this.poster = data.Poster
        this.title = data.Title
        this.id = data.imdbID
        this.rating = data.imdbRating
        this.runtime = data.Runtime 
        this.genre = data.Genre
        this.plot = data.Plot
        this.watchlisted = false
    }

    getFullMovieData(){
        return fetch(`https://www.omdbapi.com/?apikey=88ef49ef&i=${this.id}`)
                .then(res => res.json())
                .then(apiData => {
                    this.rating = apiData.imdbRating
                    this.runtime = apiData.Runtime 
                    this.genre = apiData.Genre
                    this.plot = apiData.Plot
                    return this
                })
    }

    getHtml(){
        const {poster, title, rating, runtime, genre, id, plot, watchlisted} = this
        let sign = watchlistIds.includes(id) ? "minus red" : "plus green"
        let watchlistTxt = watchlistIds.includes(id) ? "Remove" : "Watchlist"
        return `
        <div class="movie-result-container">
            <div class="poster-container">
                <img src="${poster}" alt="">
            </div>

            <div class="movie-details-container">
                <div class="movie-header-container">
                    <h1 class="movie-title">${title}</h1>
                    <i class="fa-solid fa-star orange"></i>
                    <p class="rating">${rating}</p>
                </div>

                <div class="movie-info-container">
                    <p class="runtime-txt">${runtime}</p>
                    <p class="categories-txt">${genre}</p>
                    <div class="watchlist-container" data-movie-id="${id}">
                        <i data-movie-id="${id}" class="fa-solid fa-circle-${sign}"></i>
                        <p data-movie-id="${id}" class="watchlist-txt">${watchlistTxt}</p>
                    </div>
                </div>

                <div class="movie-summary-container">
                    <p class="movie-summary-text">${plot}</p>
                </div>
            </div>
        </div>
        `
    }

    setWatchlistClick(){
        let wlContainers = document.querySelectorAll(`.watchlist-container`)
        wlContainers.forEach(container => container.addEventListener('click', (e) => {
            if(watchlistIds.includes(e.target.dataset.movieId)){
                this.watchlisted = false
                container.innerHTML = `
                <i class="fa-solid fa-circle-plus green"></i>
                <p class="watchlist-txt">Watchlist</p>
                `
                watchlistIds.splice(watchlistIds.indexOf(e.target.dataset.movieId),1)
                localStorage.setItem('watchlistIds', JSON.stringify(watchlistIds));
            } else {
                this.watchlisted = true
                container.innerHTML = `
                <i class="fa-solid fa-circle-minus red"></i>
                <p class="watchlist-txt">Remove</p>
                `
                watchlistIds.push(e.target.dataset.movieId)
                localStorage.setItem('watchlistIds', JSON.stringify(watchlistIds));
            }
            
    }))}

}

let watchlistIds = JSON.parse(localStorage.getItem("watchlistIds")) ? JSON.parse(localStorage.getItem("watchlistIds")) : []