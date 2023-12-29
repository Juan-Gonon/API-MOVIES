const tradingMovies = document.querySelector('.tradingMovies');

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



async function getTrendingPreview(){
    try{
        const tradingContent = tradingMovies.querySelector('.tradingContent');
        const res = await api('trending/movie/day');

        if(res.status != 200){
            throw new Error('ERROR ❎')
        }else{
            const tradingContent__Bg = tradingContent.querySelector('.tradingContent__Bg')
            //console.log(tradingContent__Bg)
            
            //const data = await res.json()
            const movies = res.data.results;

            movies.forEach((i)=>{
                //console.log(i);
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
                tradingContent__Bg.appendChild(card)


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
            //const data = await res.json();
            const genres = res.data.genres;

            //console.log(categories)
            
            genres.forEach((i)=>{
                //console.log(i)
                const item = document.createElement('li');

                item.innerText = i.name;

                categories.appendChild(item)
            })
        }

    }catch(err){
        console.log(err)
    }
}

getTrendingPreview()
getCategoriesPreview()






