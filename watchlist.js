import Movie from './movie.js'

document.getElementById('main-container').style.justifyContent = ''
const resultsContainerEl = document.getElementById('results-container')
const watchlistIds = JSON.parse(localStorage.getItem("watchlistIds"))
console.log(watchlistIds)

if(watchlistIds){
    document.getElementById('initial-container').style.display = 'none'
    document.getElementById('main-container').style.justifyContent = 'flex-start'
}

watchlistIds && watchlistIds.forEach(id => {
    fetch(`https://www.omdbapi.com/?apikey=88ef49ef&i=${id}`)
            .then(res => res.json())
            .then(movieData => {
                let movie = new Movie(movieData)
                resultsContainerEl.innerHTML += movie.getHtml()
            })
})