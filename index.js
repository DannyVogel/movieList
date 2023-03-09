import {Movie, watchlist} from './movie.js'

const mainContainerEl = document.getElementById('main-container')
const initialContainerEl = document.getElementById('initial-container')
const resultsContainerEl = document.getElementById('results-container')
const loadingEl = document.getElementById('lds-hourglass')

document.getElementById('search-bar-btn').addEventListener('click', ()=> {
    let searchTerm = document.getElementById('search-bar-input').value

    resultsContainerEl.innerHTML = ''
    resultsContainerEl.style.display = 'none'
    initialContainerEl.style.display = 'none'
    loadingEl.innerHTML = 'Searching...'
    mainContainerEl.style.justifyContent = 'center'
    loadingEl.style.display = 'inline-block'
    
    fetch(`https://www.omdbapi.com/?apikey=88ef49ef&s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response == 'False'){
                setTimeout(()=>{
                    loadingEl.style.display = 'none'
                    initialContainerEl.style.display = ''
                    initialContainerEl.innerHTML = "Unable to find what you’re looking for. Please try another search."
                }, 2000)
            } else {
                setTimeout(()=>{
                    loadingEl.style.display = 'none'
                    initialContainerEl.style.display = 'none'
                    mainContainerEl.style.justifyContent = 'flex-start'
                    resultsContainerEl.style.display = ''
                }, 2000)
                
                data.Search
                    .map(result => new Movie(result))
                    .forEach(item => {
                        item.getFullMovieData()
                            .then((movie) => {
                                resultsContainerEl.innerHTML += movie.getHtml()
                                movie.setWatchlistClick()
                            })
                    })
            }
        })
})