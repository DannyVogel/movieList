import Movie from './movie.js'

const mainContainerEl = document.getElementById('main-container')
const initialContainerEl = document.getElementById('initial-container')
const resultsContainerEl = document.getElementById('results-container')


document.getElementById('search-bar-btn').addEventListener('click', ()=> {
    resultsContainerEl.innerHTML = ''
    initialContainerEl.style.display = ''
    mainContainerEl.style.justifyContent = 'center'
    let searchTerm = document.getElementById('search-bar-input').value
    
    fetch(`http://www.omdbapi.com/?apikey=88ef49ef&s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response == 'False'){
                initialContainerEl.innerHTML = "Unable to find what you’re looking for. Please try another search."
            } else {
                initialContainerEl.style.display = 'none'
                mainContainerEl.style.justifyContent = 'flex-start'
                
                data.Search
                    .map(result => new Movie(result))
                    .forEach(item => {
                        item.getFullMovieData()
                            .then((movie) => {
                                resultsContainerEl.innerHTML += movie.getHtml()
                            })
                    })
            }
        })
})





