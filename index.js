import Movie from './movie.js'

const mainContainerEl = document.getElementById('main-container')
const initialContainerEl = document.getElementById('initial-container')
const resultsContainerEl = document.getElementById('results-container')
const loadingEl = document.getElementById('lds-hourglass')


document.getElementById('search-bar-btn').addEventListener('click', ()=> {
    resultsContainerEl.innerHTML = ''
    initialContainerEl.style.display = ''
    initialContainerEl.innerHTML = 'Searching...'
    mainContainerEl.style.justifyContent = 'center'

    let searchTerm = document.getElementById('search-bar-input').value

    loadingEl.style.display = 'inline-block'
    setTimeout(()=>{
        loadingEl.style.display = 'none'
        
        fetch(`https://www.omdbapi.com/?apikey=88ef49ef&s=${searchTerm}`)
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
    }, 2000)
})





