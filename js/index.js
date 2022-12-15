// first movie fetch url
//const url1 = 'http://localhost:3000/films/1' 
// all movies fetch url
let url = 'https://flatdango-sage.vercel.app/db.json'


document.addEventListener('DOMContentLoaded', ()=>{

document.getElementsByClassName('nav-item')[0].remove()

    // get first movie details
    const fetchData1 = () => {
    fetch(url).then(res => res.json())
    .then(firstMovie => {
        console.log(firstMovie.films)
        const movie1 =  document.getElementById('poster')
        console.log(movie1)
        movie1.src = firstMovie.films[0].poster
        const movie1Title = document.querySelector('#title');
        movie1Title.textContent = firstMovie.films[0].title;
        const movie1Time = document.querySelector('#runtime');
        movie1Time.textContent = `${firstMovie.films[0].runtime} minutes`;
        const movie1Description = document.querySelector('#description');
        movie1Description.textContent = firstMovie.films[0].description;
        const showTime = document.querySelector('#showtime')
        showTime.textContent = firstMovie.films[0].showtime;
        const tickets  = document.querySelector('#available-ticket')
        tickets.textContent = firstMovie.films[0].capacity - firstMovie.films[0].tickets_sold;
        const btn = document.getElementById('buy-ticket')
        btn.textContent = 'buy movie'

    })
    }

    const navBar = document.getElementById('movies-list')

    //Create fetch function
    const fetchAllMovies = url => {
        fetch(url).then(res => res.json())
        .then(movies => {
            movies.films.forEach(movie => {
                displayAllMovies(movie)
            });
        })
    }

    // display movies lists in the menu 
    const displayAllMovies = movie => {
    
        const li = document.createElement('li')
        li.style.cursor ="pointer"
        li.textContent = (movie.title).toUpperCase()
        navBar.appendChild(li)
        displayMovieDetails()
    }

    // click to dsplay movie details
    ///const displayMovieDetails = () =>{
       // let children = navBar.children
        // console.log(children)

        //for(let i=0; i<children.length; i++){
          //  let child = children[i]
            // console.log(child)

          //  child.addEventListener('click',() => {
              //  fetch(`${url}/${i+1}`)

              //  .then(res => res.json())
               // .then(movie => {
                 //   document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                 //   setUpMovieDetails(movie)
              //  })

           // })
        //}
  //  }
  const displayMovieDetails = () =>{
    
            
            // let children = navBar.children
            // // console.log(children)
    
            // for(let i=0; i<children.length; i++){
            //     let child = children[i]
                // console.log(child)
    
                navBar.addEventListener('click',(e) => {
                    fetch(url)
    
                    .then(res => res.json())
                    .then(movies => {
                        movies.films.map(movie=>{if(e.target.textContent === movie.title.toUpperCase()){
                            document.getElementById('buy-ticket').textContent = 'Buy Ticket'
                            setUpMovieDetails(movie)
                            }

                        })
                       
                    })
    
                })
            }
    // create movie details card
    function setUpMovieDetails(childMovie){
        const preview = document.getElementById('poster')
        preview.src = childMovie.poster;

        const movieTitle = document.querySelector('#title');
        movieTitle.textContent = childMovie.title;
        const movieTime = document.querySelector('#runtime');
        movieTime.textContent = `${childMovie.runtime} minutes`;
        const movieDescription = document.querySelector('#description');
        movieDescription.textContent = childMovie.description;
        const showTime = document.querySelector('#showtime')
        showTime.textContent = childMovie.showtime;
        const tickets  = document.querySelector('#available-ticket')
        tickets.textContent = childMovie.capacity - childMovie.tickets_sold;
    }
    const btn = document.getElementById('buy-ticket')

            btn.addEventListener('click', function(e){
                let availableTicket = document.querySelector('#available-ticket').textContent
                e.preventDefault()
                if(availableTicket > 0){
                    document.querySelector('#available-ticket').textContent  = availableTicket-1
                    
                }
                else if(parseInt(availableTicket, 10)===0){
                    btn.textContent = 'Sold Out'
                    btn.classList.add('')
                }
        })

        fetchAllMovies(url)
        fetchData1()

})