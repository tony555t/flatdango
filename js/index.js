
//const url1 = 'http://localhost:3000/films/1' 
let url = 'http://localhost:3000/films'

document.addEventListener('DOMContentLoaded', ()=>{

    document.getElementsByClassName('nav-item')[0].remove()

    // get first movie details
    const fetchData1 = () => {
    fetch(url1).then(res => res.json())
    .then(movieOne => {
        const movie1 =  document.getElementById('poster')
        console.log(movie1)
        movie1.src = fMovie.poster
        const movie1Title = document.querySelector('#title');
        movie1Title.textContent = movieOne.title;
        const movie1Time = document.querySelector('#runtime');
        movie1Time.textContent = `${movieone.runtime} minutes`;
        const movie1Description = document.querySelector('#description');
        movie1Description.textContent = movieOne.description;
        const showTime = document.querySelector('#showtime')
        showTime.textContent = movieOne.showtime;
        const tickets  = document.querySelector('#ticketnum')
        tickets.textContent = movieOne.capacity - MovieOne.tickets_sold;
        const btn = document.getElementById('buy-ticket')
        btn.textContent = 'buy movie'

    })
    }

    const navBar = document.getElementById('movies-list')

    //fetch function
    const fetchAllMovies = url => {
        fetch(url).then(res => res.json())
        .then(movies => {
            movies.forEach(movie => {
                displayAllMovies(movie)
            });
        })
    }

    // movies lists 
    const displayAllMovies = movie => {
    
        const li = document.createElement('li')
        li.style.cursor ="pointer"
        li.textContent = (movie.title).toUpperCase()
        navBar.appendChild(li)
        displayMovieDetails()
    }

    
    const displayMovieDetails = () =>{
        let children = navBar.children
    

        for(let i=0; i<children.length; i++){
            let child = children[i]
        

            child.addEventListener('click',() => {
                fetch(`${url}/${i+1}`)

                .then(res => res.json())
                .then(movie => {
                    document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                    setUpMovieDetails(movie)
                })

            })
        }
    }
    // details card
    function setUpMovieDetails(childMovie){
        const preview = document.getElementById('poster')
        preview.src = childMovie.poster;

        const movieTitle = document.querySelector('#title');
        movieTitle.textContent = childMovie.title;
        const movieTime = document.querySelector('#runtime');
        movieTime.textContent = `${childMovie.runtime} minutes`;
        const movieDescription = document.querySelector('#filminfo');
        movieDescription.textContent = childMovie.description;
        const showTime = document.querySelector('showtime')
        showTime.textContent = childMovie.showtime;
        const tickets  = document.querySelector('#ticketnum')
        tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
    }
    const btn = document.getElementById('buy-ticket')

            btn.addEventListener('click', function(e){
                let availableTicket = document.querySelector('#ticketnum').textContent
                e.preventDefault()
                if(availableTicket > 0){
                    document.querySelector('#ticketnum').textContent  = availableTicket-1
                    
                }
                else if(parseInt(availableTicket, 10)===0){
                    btn.textContent = 'Sold Out'
                    btn.classList.add('')
                }
        })

        fetchAllMovies(url)
        fetchData1()

})