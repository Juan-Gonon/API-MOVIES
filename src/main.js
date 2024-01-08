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

function createMovies(movies, container){
    container.innerHTML = '';

    movies.forEach((i)=>{
        const card = document.createElement('div');
        const card__Image = document.createElement('div');
        const img = document.createElement('img');
        const card__content = document.createElement('div');
        const card__text = document.createElement('p');


        card.classList.add('card');
        card__Image.classList.add('card__Image');
        card__content.classList.add('card__content');
        card__text.classList.add('card__text')
       
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

            createMovies(movies, tradingContent__Bg)
            
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

            createMovies(data, genericList__Bg)
          
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
 
             createMovies(data, genericList__Bg)
           
         }
         
     } catch (error) {
         console.log(error)
     }


}








