import Movie from './movie.js'

document.getElementById('search-bar-btn').addEventListener('click', ()=> {
    document.getElementById('results-container').innerHTML = ''
    document.getElementById('initial-container').style.display = ''
    document.getElementById('main-container').style.justifyContent = 'center'
    let searchTerm = document.getElementById('search-bar-input').value
    
    fetch(`http://www.omdbapi.com/?apikey=88ef49ef&s=${searchTerm}`)
        .then(res => res.json())
        .then(data => {
            if(data.Response == 'False'){
                document.getElementById('initial-container').innerHTML = "Unable to find what you’re looking for. Please try another search."
            } else {
                document.getElementById('initial-container').style.display = 'none'
                document.getElementById('main-container').style.justifyContent = 'flex-start'
                
                data.Search
                    .map(result => new Movie(result))
                    .forEach(item => {
                        item.getFullMovieData()
                            .then((movie) => {
                                document.getElementById('results-container').innerHTML += movie.getHtml()
                            })
                    })
            }
        })
})





