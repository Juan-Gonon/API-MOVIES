// const tradingMovies = document.querySelector('.tradingMovies');
//https://api.themoviedb.org/3/api_ke=44403b8cedc1b1576a816c03d2537c94?

// DATA
const api = new axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY,
        'language': API_LANG
    }
});



function likedMoviesList(){
    const item = JSON.parse(localStorage.getItem('liked-movie'));
    let movies;

    if(item){
        movies = item;
    }else{
        movies = {};
    }

    // console.log(movies)

    return movies;
}

function likedMovie(movie){
    const likedMovies = likedMoviesList();

//    console.log(likedMovies)

    if(likedMovies[movie.id]){
       likedMovies[movie.id] = undefined;
    }else{
        likedMovies[movie.id] = movie;
    }

    localStorage.setItem('liked-movie', JSON.stringify(likedMovies))
    
}

/**______________ UTILS ___________________ */

const lazyLoader = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
        //console.log(entry.target.setAttribute);
        if(entry.isIntersecting){
            const url = entry.target.getAttribute('data');
            entry.target.setAttribute('src', url)
        }
      
        
    })
});

function createMovies(movies, container, 
    cardM, cardI, 
    cardC, cardT, 
    {
        lazyLoad =  false, 
        clean = true
    } = {}
    ){
    
    if(clean){
        container.innerHTML = '';
    }
    
    // console.log(movies)

    movies.forEach((i)=>{
        const card = document.createElement('div');
        const card__Image = document.createElement('div');
        const img = document.createElement('img');
        const card__content = document.createElement('div');
        const card__text = document.createElement('p');
        const btn__favorite = document.createElement('button');


        card__Image.addEventListener('click', ()=>{
            // console.log('has hecho click en: ' + i.title);
            location.hash = `#movie=${i.id}`
        })

        card.classList.add(cardM);
        card__Image.classList.add(cardI);
        card__content.classList.add(cardC);
        card__text.classList.add(cardT);

        btn__favorite.classList.add('btnFavorite');
        // btn__favorite.innerText = 'favorite';
        
        likedMoviesList()[i.id] && btn__favorite.classList.add('active');

        btn__favorite.addEventListener('click', ()=>{
            btn__favorite.classList.toggle('active');
            likedMovie(i);
            getLikedMovies();
        })

        

       
        img.setAttribute('alt', i.title);
        img.setAttribute(
            lazyLoad ? 'data' : 'src', 'https://image.tmdb.org/t/p/w300' + i.poster_path);
        card__text.innerText = i.title;
        img.addEventListener('error', (error)=>{
            img.setAttribute('src', '../img/and.jpg')
        })

        card__Image.appendChild(img);
        card.appendChild(card__Image);
        card__content.appendChild(card__text);
        card.appendChild(card__content)
        card.appendChild(btn__favorite)

        //console.log(card)
        container.appendChild(card)
        if(lazyLoad){
            lazyLoader.observe(img)
        }
    })
}

function createCategories(categories, container){
    container.innerHTML = '';
    
    categories.forEach((i)=>{
        //console.log(i)
        const item = document.createElement('li');

        item.setAttribute('id', 'id'+ i.id)

        item.innerText = i.name;

        item.addEventListener('click', ()=>{
            location.hash = `#category=${i.id}-${i.name}`;
        })

        container.appendChild(item)

        // console.log(item)
    })

}



/**______________ Llamados a la API ___________________ */


async function getTrendingPreview(){
    try{
        const tradingContent = tradingMovies.querySelector('.tradingContent');
        const res = await api('trending/movie/day');

        if(res.status != 200){
            throw new Error('ERROR ❎')
        }else{
            const tradingContent__Bg = tradingContent.querySelector('.tradingContent__Bg')
            const movies = res.data.results;

            createMovies(movies, tradingContent__Bg, 'card', 'card__Image', 'card__content', 'card__text', {
                lazyLoad: true,
                clean: true
            })
            
        }

    }catch(err){
        console.log(err)
    }
}

async function getCategoriesPreview(){
    try{
        const categories__content = tradingMovies.querySelector('.categories__content')
        const res = await api('genre/movie/list');
        //console.log(res.status)

        if(res.status != 200){
            throw new Error('ERROR ❎')
        }else{
            const categories = categories__content.querySelector('.categories__item .categories')
            const genres = res.data.genres;

            //console.log(categories)
            createCategories(genres, categories)
            
        }

    }catch(err){
        console.log(err)
    }
}


async function getMoviesByCategory(id, name){
    try {
    //    const genericList = tradingMovies.querySelector('.genericList-container');

        const res = await api('discover/movie',{
            params:{
                with_genres: id
            }
        })

        if(res.status != 200){
            throw new Error('ERROR ❎')
        }else{
            // console.log(typeof(name))
            
            const genericList__Bg = genericList.querySelector('.genericList__Bg');
            const data = res.data.results;
            maxPage = res.data.total_pages;
            
            if (name !== 'undefined' && name.trim() !== "") {
                text.innerText = name;
            } else {
                text.innerText = 'All';
            }
            
            // console.log(res);
           
            // console.log(data)

            createMovies(data, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text', 
            {
                lazyLoad: true,
                clean: true
            }
            )
          
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function getMoviesBySearch(query){
  
    try {
        // const genericList = tradingMovies.querySelector('.genericList-container');
 
         const res = await api('search/movie',{
             params:{
                 query
             }
         })
 
         if(res.status != 200){
             throw new Error('ERROR ❎')
         }else{
             // console.log(typeof(name))
             
             const genericList__Bg = genericList.querySelector('.genericList__Bg');
             // console.log(res);
             const data = res.data.results;
             maxPage = res.data.total_pages;
             // console.log(data)
 
             createMovies(data, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text', 
             {
                lazyLoad: true,
                clean: true
            }
            )
           
         }
         
     } catch (error) {
         console.log(error)
     }


}


async function getTrending(){
    try{
        // const genericList = tradingMovies.querySelector('.genericList-container');
        const res = await api('trending/movie/day');

        if(res.status != 200){
            throw new Error('ERROR ❎')
        }else{
            // const btnMore = document.createElement('button');
            const genericList__Bg = genericList.querySelector('.genericList__Bg');
            const movies = res.data.results;
            // console.log(res.data.total_pages)
            maxPage = res.data.total_pages;
            

            createMovies(movies, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text',
            {
                lazyLoad: true,
                clean: true
            }
            );
            // btnMore.innerText = 'Ver mas';
            // genericList__Bg.appendChild(btnMore);
            // btnMore.addEventListener('click', scrollInfiniteMovies);
            
        }

    }catch(err){
        console.log(err)
    }
}

async function getDetailsMovie(id){
    // console.log(id)
    try{
        const res = await api(`/movie/${id}`)
        
        if(res.status != 200){
            throw new Error('Error details movie')
        }else{
            // console.log(res.data)
            const data = res.data;
            const tiempo = data.runtime;
            const horas = Math.floor(tiempo/60);
            const minutos = tiempo%60;
            const formatoTiempo = `${horas}h ${minutos}m`


            backgroundImage.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + data.backdrop_path);
            contentImage.setAttribute('src', 'https://image.tmdb.org/t/p/w500' + data.poster_path);
            vote.innerText = data.vote_average;
            time.innerText = formatoTiempo;
            // console.log(data.spoken_languages)
            language.innerHTML = '';
            data.spoken_languages.forEach((lang)=>{
              
                // console.log(lang.english_name);
                // language.innerText = lang.english_name;
                const span = document.createElement('span');

                span.innerText = lang.english_name;

                language.appendChild(span)

            })

            textTitle.innerText = data.title;
            textTitleContent.innerText = data.overview;
            textTitleReleased.innerText = `Released: ${data.release_date}`;
            

            createCategories(data.genres, contentCategories);
            getMovieRecommendations(id)
            getMovieTrailer(id);

        }

    }catch(err){
        console.log(err)
    }
}

async function getMovieRecommendations(id){
    
    try{
        const res = await api(`movie/${id}/recommendations`);

        if(res.status != 200){
            throw new Error('Error al obtener recomendaciones')
        }else{
            const data = res.data;

            // console.log(data)

            createMovies(data.results, detailSimilar, 'card', 'card__Image', 'card__content', 'card__text', 
            {
                lazyLoad: true,
                clean: true
            }
            )
        }

    }catch(err){
        console.log(err)
    }
}

async function getMovieTrailer(id){

    try {
        const res = await api(`movie/${id}/videos`);
      
        if(res.status != 200){
            throw new Error('Error al obtener trailer');
        }else{
            const results = res.data.results;
            const trailer = results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            trailerVideo.innerHTML = '';
            if(trailer){
                
                // const UrlTrailer = `https://www.youtube.com/watch?v=${trailer.key}`
                // // console.log(UrlTrailer)
                // btnText.setAttribute('href', UrlTrailer);
                // btnText.setAttribute('target', '_blank');
                const iframe = document.createElement('iframe');
                const ionIcon = document.createElement('ion-icon');

                ionIcon.setAttribute('name', 'close');
                ionIcon.setAttribute('class', 'close')

                iframe.src = `https://www.youtube.com/embed/${trailer.key}`;
                // iframe.width = 560; // Ajusta el ancho según tus necesidades
                // iframe.height = 315; // Ajusta la altura según tus necesidades
                trailerVideo.appendChild(ionIcon)
                trailerVideo.appendChild(iframe)
                ionIcon.onclick = ()=>{
                    toggleVideo()
                }
            }else{
                console.log('Trailer no encontrado')
                btnText.setAttribute('href', '#');
               
            }

        }
    } catch (error) {
        console.log(error)
    }
}

async function getMoviesPopular(){
    try {
        const res = await api('movie/popular')
        
        if(res.status != 200){
            throw new Error('Error en Popular')
        }else{
            // movieList__Popular__content.innerHTML = '';
            const data = res.data.results;
            maxPage = res.data.total_pages;

            createMovies(data, movieList__Popular__content, 'card__popular', 'cardImage', 'text', 'popular_text',
            {
                lazyLoad: true,
                clean: true
            }
            )

        }
        
    } catch (error) {
        console.log(error)
    }
}

async function getMoviesUpcoming(){
    try {
        const res = await api('movie/upcoming');

        if(res.status != 200){
            throw new Error('Error al obtener Upcoming')
        }else{
            const data = res.data.results;
            maxPage = res.data.total_pages;

            createMovies(data, Upcoming__bg, 'card', 'card__Image', 'card__content', 'card__text', 
            {
                lazyLoad: true,
                clean: true
            }
            )
        }
    } catch (error) {
        console.log(error)
    }
}

async function movieLanguage(){
    try {
        const res = await api('configuration/languages');

        if(res.status != 200){
            throw new Error('Error al obtener lenguaje')
        }else{
            const data = res.data;

            //English Russian
            const lang = data.filter((lang)=>{
                if(lang.english_name === 'Spanish' || 
                    lang.english_name === 'Catalan' ||
                    lang.english_name === 'Russian' ||
                    lang.english_name === 'English'){
                    return lang
                }
            });

           

            lang.forEach((i)=>{
                idiomas.push(i.iso_639_1)

            })

            langs.childNodes.forEach((chields)=>{
                if(chields.nodeType === 1){
                    spanLangs.push(chields)
                }
            })

            selectLanguage(idiomas, spanLangs)


        }
        
    } catch (error) {
        console.log(error);
    }
}




/* Infinite Scroller */

async function scrollInfiniteTrending(){

    try {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        const scrollIsBottom = (scrollTop+clientHeight) >= scrollHeight;
        const pageIsNotMax = page < maxPage;

    
        if(scrollIsBottom && pageIsNotMax){
            page++;

            const res = await api('trending/movie/day', {
                params: {
                    page
                }
            })

            if(res.status != 200){
                throw new Error('Error al hacer scroll Infinite')
            }else{
                // const btnMore = document.createElement('button');
                const genericList__Bg = genericList.querySelector('.genericList__Bg');
                const movies = res.data.results;
               
    
                createMovies(movies, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text', {
                    lazyLoad: true,
                    clean: false
                }
                );
    
                // btnMore.innerText = 'Ver mas';
                // genericList__Bg.appendChild(btnMore);
                // btnMore.addEventListener('click', scrollInfiniteMovies);
            }


    
        }
    } catch (error) {
        console.log(error)
    }
}


async function scrollInfinitePopular(){
    try {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        const ScrollPopular = (scrollTop + clientHeight) >= scrollHeight;
        // console.log(page)
        const PageIsNotMax = page < maxPage;

        if(ScrollPopular && PageIsNotMax){
            page++;

            const res = await api('movie/popular', {
                params: {
                    page
                }
            })

            if(res.status != 200){
                throw new Error('Error en el scroll Popular')
            }else{
                const data = res.data.results;
                createMovies(data, movieList__Popular__content, 'card__popular', 'cardImage', 'text', 'popular_text',
                {
                    lazyLoad: true,
                    clean: false
                }
                )

            }

        }
    } catch (error) {
        console.log(error)
    }
}

async function scrollInfiniteUpcoming(){
    try {
        const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
        const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight;
        console.log(page)
        const pageIsNotMax = page < maxPage;
        
        if(scrollIsBottom && pageIsNotMax){
            page++;

            const res = await api('movie/upcoming', {
                params:{
                    page
                }
            })

            if(res.status != 200){
                throw new Error('Error en scroll Upcoming')
            }else{
                const data = res.data.results
                createMovies(data, Upcoming__bg, 'card', 'card__Image', 'card__content', 'card__text', 
                {
                    lazyLoad: true,
                    clean: false
                }
                )
            }
        }

        
    } catch (error) {
        console.log(error)
        
    }
}


function scrollInfiniteSearch(query){

    return async function(){
        try {
            const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
            const scrollIsBottom = (scrollTop + clientHeight) >= scrollHeight;
            const PageIsNotMax = page < maxPage;

            if(scrollIsBottom && PageIsNotMax){
                page++;
                const res = await api('search/movie', {
                    params:{
                        query,
                        page
                    }
                })

                if(res.status != 200){
                    throw new Error('Error en el scroll search')
                }else{
                   
                    const genericList__Bg = genericList.querySelector('.genericList__Bg');
                    const data = res.data.results;
                    createMovies(data, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text', 
                    {
                        lazyLoad: true,
                        clean: false
                    }
                    )

                }
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}


function scrollInfiniteMoviesCategories(id){

    return async ()=>{

        try {
            const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
            const scrollIsBottom = (scrollTop+clientHeight) >= scrollHeight;
            const pageIsNotMax = page < maxPage;


            if(scrollIsBottom && pageIsNotMax){
                page++;

                const res = await api('discover/movie',{
                    params:{
                        with_genres: id,
                        page
                    }
                })

                if(res.status != 200){
                    throw new Error('Error en scroll infinite movie Categories')
                }else{
                        
                     const genericList__Bg = genericList.querySelector('.genericList__Bg');
                    const data = res.data.results;
                    console.log(res.data.results)

                    createMovies(data, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text', 
                        {
                            lazyLoad: true,
                            clean: false
                        }
                    )
                }

                
            }
            
        } catch (error) {
            console.log(error)
        }
    }
}




//Consumiendo Local Storage

function getLikedMovies(){
    const likedMovies = likedMoviesList();

    const movieArray = Object.values(likedMovies)

    createMovies(movieArray, liked__card, 'card', 'card__Image', 'card__content', 'card__text',
    {
        lazyLoad: true,
        clean: true
    }
    );
}



