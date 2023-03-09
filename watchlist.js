import Movie from './movie.js'

const resultsContainerEl = document.getElementById('results-container')
let watchlistIds = JSON.parse(localStorage.getItem("watchlistIds"))

document.getElementById('main-container').style.justifyContent = ''

if(watchlistIds && watchlistIds.length > 0){
    document.getElementById('initial-container').style.display = 'none'
    document.getElementById('main-container').style.justifyContent = 'flex-start'
}

watchlistIds && renderWatchlist()

function renderWatchlist(){
    watchlistIds.forEach(id => {
        fetch(`https://www.omdbapi.com/?apikey=88ef49ef&i=${id}`)
                .then(res => res.json())
                .then(movieData => {
                    let movie = new Movie(movieData)
                    movie.watchlisted = true
                    resultsContainerEl.innerHTML += movie.getHtml()
                    movie.setWatchlistClick()
                })
    })
}

