window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator(){

    // console.log({location})

    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetailsPage()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage()
    }else{
        homePage()
    }

    //document.documentElement.scrollTop = 0;
    window.scrollTo(0, 0);
}


function homePage(){
    console.log('home')
    // head.style.position = 'absolute'; 
    getTrendingPreview()
    getCategoriesPreview()

    search_icon.value = '';

    // const clases = main.classList;
    trading.classList.remove('active');
    tradingMovies.classList.remove('active');
    genericList.classList.add('inactive')
    categories__content.classList.remove('active')
    iconSearch.classList.remove('active');
    search.classList.remove('active');
    tradingMovies.classList.remove('inactive')


    head.classList.remove('active');
    trading__text.classList.remove('active');
    tradingContent.classList.remove('active')
    categories__end.classList.remove('active');
    details.classList.add('inactive')
    //console.log(clases)

    // const mainClass = Array.from(clases).find((classes)=>{
    //     if(classes != 'main'){
    //         main.classList.remove(classes)
    //     }
    // });

}

function  categoriesPage(){
    // head.style.position = 'absolute'; 
    // console.log('categories')
    // console.log(main)
  
    // main.classList.add('cat')
    // console.log(location.hash)
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

    const [_, categoryData] = location.hash.split('=')
    //console.log(categoryData)
    const [categoryId, categoryName] = categoryData.split('-')

    const name = decodeURIComponent(categoryName)
    console.log(name)
    //console.log(categoryId)
    getMoviesByCategory(categoryId, name);
}

function movieDetailsPage(){
    console.log('Movie')
    // head.style.position = 'absolute'; 
    trading.classList.add('active');
    tradingMovies.classList.add('inactive');
    details.classList.remove('inactive');
    head.classList.remove('active')
    // head.classList.add('active');

   const [_, id] = location.hash.split('=');

    getDetailsMovie(id)
}

function searchPage(){
    console.log('Búsqueda')

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
    }else{
        // homePage()
        history.back()
    }
}

function trendsPage(){
    search_icon.value = '';
    // head.style.position = 'absolute';
    genericList.style.top = '0px';

    console.log('TRENDS')
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
    tradingMovies.classList.remove('inactive')


    getTrending()

}

categories__end.addEventListener('click', ()=>{
    history.back()
    // location.hash = '#home'
})

// iconSearch.addEventListener('click', ()=>{
//     console.log(search_icon.value)
//     location.hash = '#search=' + search_icon.value;
// })

back.addEventListener('click', ()=>{
    history.back()
})

search_icon.addEventListener('input', ()=>{
    console.log(search_icon.value)
    location.hash = '#search=' + search_icon.value;
})



