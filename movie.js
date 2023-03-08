export default class Movie {
    constructor(data){
        this.poster = data.Poster
        this.title = data.Title
        this.id = data.imdbID
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
        const {poster, title, rating, runtime, genre, plot} = this
        return `
        <div class="movie-result-container">
            <div class="poster-container">
                <img src="${poster}" alt="">
            </div>

            <div class="movie-details-container">
                <div class="movie-header-container">
                    <h1 class="movie-title">${title}</h1>
                    <i class="fa-solid fa-star"></i>
                    <p class="rating">${rating}</p>
                </div>

                <div class="movie-info-container">
                    <p class="runtime-txt">${runtime}</p>
                    <p class="categories-txt">${genre}</p>
                    <div class="watchlist-container">
                        <i class="fa-solid fa-circle-plus"></i>
                        <p class="watchlist-txt">Watchlist</p>
                    </div>
                </div>

                <div class="movie-summary-container">
                    <p class="movie-summary-text">${plot}</p>
                </div>
            </div>
        </div>
        `
    }
}