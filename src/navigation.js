let page = 1;
let infiniteScroll;
let maxPage;
let idiomas = [];
let spanLangs = [];



window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);
window.addEventListener('scroll', infiniteScroll, false);





function navigator(){

    if(infiniteScroll){
        // console.log(infiniteScroll);
        window.removeEventListener('scroll', infiniteScroll, {
            passive: false
        })
        infiniteScroll = undefined
    }

    // console.log({location})

    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetailsPage()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage()
    }else if(location.hash.startsWith('#popular')){
        popularPage()
    }else if(location.hash.startsWith('#upcoming')){
        upcomingPage()
    }
    else{
        homePage()
    }

    //document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
    if(infiniteScroll){
        // console.log(infiniteScroll);
        window.addEventListener('scroll', infiniteScroll, {
            passive: false
        })

    }
}


function homePage(){
    // head.style.position = 'absolute'; 
    
    getTrendingPreview()
    getCategoriesPreview()
    getMoviesPopular()
    getMoviesUpcoming()
    getLikedMovies()
    movieLanguage()
   

    // window.addEventListener("storage", (e) =>{
    //     setState(JSON.parse(e.newValue));
    //     console.log(setState(JSON.parse(e.newValue)))
    // })

    search_icon.value = '';

    // const clases = main.classList;
    trading.classList.remove('active');
    tradingMovies.classList.remove('active');
    genericList.classList.add('inactive')
    categories__content.classList.remove('active')
    iconSearch.classList.remove('active');
    search.classList.remove('active');
    tradingMovies.classList.remove('inactive');
    movieList.classList.remove('inactive');
    movieList.classList.remove('active');
    movieList__Popular.classList.remove('active')
    movieList__Popular.classList.remove('active');
    movieList__Popular.classList.remove('upcoming');
    footer.classList.remove('inactive');
    liked__container.classList.remove('active')


    head.classList.remove('active');
    trading__text.classList.remove('active');
    tradingContent.classList.remove('active')
    categories__end.classList.remove('active');
    details.classList.add('inactive');
    //console.log(clases)

    // const mainClass = Array.from(clases).find((classes)=>{
    //     if(classes != 'main'){
    //         main.classList.remove(classes)
    //     }
    // });

}

function  categoriesPage(){
    genericList.style.top = '0px';
    head.classList.add('active');
    trading.classList.add('active');
    trading__text.classList.add('active');
    tradingContent.classList.add('active')
    genericList.classList.remove('inactive')
    tradingMovies.classList.remove('active')
    categories__content.classList.add('active');
    categories__end.classList.add('active')
    iconSearch.classList.remove('active');
    search.classList.remove('active');
    details.classList.add('inactive');
    tradingMovies.classList.remove('inactive');
    movieList.classList.add('inactive');
    movieList.classList.remove('active');
    footer.classList.remove('inactive');
    liked__container.classList.add('active')

    const [_, categoryData] = location.hash.split('=')
    //console.log(categoryData)
    const [categoryId, categoryName] = categoryData.split('-')

    const name = decodeURIComponent(categoryName)
    // console.log(name)
    //console.log(categoryId)
    getMoviesByCategory(categoryId, name);
    infiniteScroll = scrollInfiniteMoviesCategories(categoryId)
}

function movieDetailsPage(){
    trading.classList.add('active');
    tradingMovies.classList.add('inactive');
    details.classList.remove('inactive');
    head.classList.remove('active')
    movieList.classList.add('inactive');
    movieList.classList.remove('active');
    footer.classList.remove('inactive');
    // head.classList.add('active');

   const [_, id] = location.hash.split('=');

    getDetailsMovie(id)
}

function searchPage(){

    head.classList.remove('active');
    // head.style.position = 'absolute'; 
    trading.classList.add('active');
    trading__text.classList.add('active');
    tradingContent.classList.add('active')
    
    tradingMovies.classList.add('active')
    categories__content.classList.remove('active');
    categories__end.classList.add('active');
    details.classList.add('inactive');
    tradingMovies.classList.remove('inactive')
    movieList.classList.add('inactive');
    movieList.classList.remove('active');
    footer.classList.add('inactive');

    // head.style.position = 'relative';

    // console.log(location.hash)

    const [_, query] = location.hash.split('=');

    // console.log(query)

    const name = decodeURIComponent(query)
    // console.log(name)

    if(name != ''){
        genericList.classList.remove('inactive');
        genericList.style.top = '50px';
        getMoviesBySearch(name)
        page = 1;
        infiniteScroll = scrollInfiniteSearch(name)
        
    }else{
        // homePage()
        history.back()
    }

   

}

function trendsPage(){
    search_icon.value = '';
    // head.style.position = 'absolute';
    genericList.style.top = '0px';

    head.classList.remove('active')
    trading.classList.add('active');
    trading__text.classList.remove('active')
    tradingMovies.classList.add('active');
    tradingContent.classList.remove('active')
    categories__content.classList.remove('active');
    genericList.classList.remove('inactive')
    iconSearch.classList.remove('active');
    search.classList.remove('active');
    details.classList.add('inactive');
    tradingMovies.classList.remove('inactive');
    movieList.classList.add('inactive');
    movieList.classList.remove('active');
    footer.classList.add('inactive');


    getTrending()
    page = 1;
    infiniteScroll = scrollInfiniteTrending;

}

function popularPage(){
        // head.style.position = 'absolute';

        // console.log('TRENDS')
        head.classList.remove('active')
        trading.classList.add('active');
        trading__text.classList.remove('active')
        tradingMovies.classList.add('inactive');
        // tradingContent.classList.remove('active')
        // categories__content.classList.remove('active');
        // genericList.classList.remove('inactive')
        iconSearch.classList.remove('active');
        search.classList.remove('active');
        details.classList.add('inactive');
        // tradingMovies.classList.remove('inactive');
        movieList.classList.remove('inactive');
        movieList__Popular.classList.add('active');
        movieList__Popular.classList.remove('upcoming');
        // movieList__Upcoming.classList.remove('active');
        footer.classList.add('inactive');
        page = 1;
        infiniteScroll = scrollInfinitePopular;

}

function upcomingPage(){
    head.classList.remove('active')
    trading.classList.add('active');
    trading__text.classList.remove('active')
    tradingMovies.classList.add('inactive');
    iconSearch.classList.remove('active');
    search.classList.remove('active');
    details.classList.add('inactive');
    movieList.classList.remove('inactive');
    movieList__Popular.classList.remove('active');
    // movieList__Upcoming.classList.add('active');
    movieList__Popular.classList.add('upcoming');
    footer.classList.add('inactive');

    page = 1;
    infiniteScroll = scrollInfiniteUpcoming;
}

categories__end.addEventListener('click', ()=>{
    history.back()
    // location.hash = '#home'
})


back.addEventListener('click', ()=>{
    history.back()
})

search_icon.addEventListener('input', ()=>{
    // console.log(search_icon.value)
    location.hash = '#search=' + search_icon.value;
})



