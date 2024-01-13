// const tradingMovies = document.querySelector('.tradingMovies');
//https://api.themoviedb.org/3/api_ke=44403b8cedc1b1576a816c03d2537c94?
const api = new axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8'
    },
    params:{
        'api_key': API_KEY
    }
});

//console.log(api)

/**______________ UTILS ___________________ */

function createMovies(movies, container, cardM, cardI, cardC, cardT){
    container.innerHTML = '';

    movies.forEach((i)=>{
        const card = document.createElement('div');
        const card__Image = document.createElement('div');
        const img = document.createElement('img');
        const card__content = document.createElement('div');
        const card__text = document.createElement('p');

        card.addEventListener('click', ()=>{
            // console.log('has hecho click en: ' + i.title);
            location.hash = `#movie=${i.id}`
        })

        card.classList.add(cardM);
        card__Image.classList.add(cardI);
        card__content.classList.add(cardC);
        card__text.classList.add(cardT)

       
       
        img.setAttribute('alt', i.title)
        img.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + i.poster_path)
        card__text.innerText = i.title

        card__Image.appendChild(img);
        card.appendChild(card__Image);
        card__content.appendChild(card__text);
        card.appendChild(card__content)

        //console.log(card)
        container.appendChild(card)

      
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

            createMovies(movies, tradingContent__Bg, 'card', 'card__Image', 'card__content', 'card__text')
            
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
       const genericList = tradingMovies.querySelector('.genericList-container');

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
            
            if (name !== 'undefined' && name.trim() !== "") {
                text.innerText = name;
            } else {
                text.innerText = 'All';
            }
            
            // console.log(res);
            const data = res.data.results;
            // console.log(data)

            createMovies(data, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text')
          
        }
        
    } catch (error) {
        console.log(error)
    }
}

async function getMoviesBySearch(query){
  
    try {
        const genericList = tradingMovies.querySelector('.genericList-container');
 
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
             // console.log(data)
 
             createMovies(data, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text')
           
         }
         
     } catch (error) {
         console.log(error)
     }


}


async function getTrending(){
    try{
        const genericList = tradingMovies.querySelector('.genericList-container');
        const res = await api('trending/movie/day');

        if(res.status != 200){
            throw new Error('ERROR ❎')
        }else{
            const genericList__Bg = genericList.querySelector('.genericList__Bg');
            const movies = res.data.results;

            createMovies(movies, genericList__Bg, 'card', 'card__Image', 'card__content', 'card__text')
            
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

            createMovies(data.results, detailSimilar, 'card', 'card__Image', 'card__content', 'card__text')
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
            createMovies(data, movieList__Popular__content, 'card__popular', 'cardImage', 'text', 'popular_text')

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
            const data = res.data.results
            createMovies(data, Upcoming__bg, 'card', 'card__Image', 'card__content', 'card__text')
        }
    } catch (error) {
        console.log(error)
    }
}







