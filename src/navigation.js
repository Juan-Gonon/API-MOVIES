window.addEventListener('DOMContentLoaded', navigator, false)
window.addEventListener('hashchange', navigator, false)

function navigator(){

    // console.log({location})

    if(location.hash.startsWith('#trends')){
        trendsPage()
    }else if(location.hash.startsWith('#search=')){
        searchPage()
    }else if(location.hash.startsWith('#movie=')){
        movieDetails()
    }else if(location.hash.startsWith('#category=')){
        categoriesPage()
    }else{
        homePage()
    }

    //document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
}


function homePage(){
    console.log('home')
    head.style.position = 'absolute'; 
    getTrendingPreview()
    getCategoriesPreview()

    search_icon.value = '';

    // const clases = main.classList;
    trading.classList.remove('active');
    tradingMovies.classList.remove('active');
    genericList.classList.add('inactive')
    categories__content.classList.remove('active')
    iconSearch.classList.remove('active');
    search.classList.remove('active')


    head.classList.remove('active');
    trading__text.classList.remove('active');
    tradingContent.classList.remove('active')
    categories__end.classList.remove('active')
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
    head.classList.add('active');
    trading.classList.add('active');
    trading__text.classList.add('active');
    tradingContent.classList.add('active')
    genericList.classList.remove('inactive')
    tradingMovies.classList.remove('active')
    categories__content.classList.add('active');
    categories__end.classList.add('active')
    iconSearch.classList.remove('active');
    search.classList.remove('active')

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
}

function searchPage(){
    console.log('Búsqueda')

    trading.classList.add('active');
    trading__text.classList.add('active');
    tradingContent.classList.add('active')
    
    tradingMovies.classList.add('active')
    categories__content.classList.remove('active');
    categories__end.classList.add('active')

    head.style.position = 'relative';

    

    // console.log(location.hash)

    const [_, query] = location.hash.split('=');

    // console.log(query)

    const name = decodeURIComponent(query)
    // console.log(name)

    if(name != ''){
        genericList.classList.remove('inactive')
        getMoviesBySearch(name)
    }else{
        genericList.classList.add('inactive')
        homePage()
    }



}

function trendsPage(){
    search_icon.value = '';
    head.style.position = 'absolute';

    console.log('TRENDS')
    trading.classList.add('active');
    trading__text.classList.remove('active')
    tradingMovies.classList.add('active');
    tradingContent.classList.remove('active')
    categories__content.classList.remove('active');
    genericList.classList.add('inactive')
    iconSearch.classList.remove('active');
    search.classList.remove('active')
}

categories__end.addEventListener('click', ()=>{
    location.hash = '#home'
})

// iconSearch.addEventListener('click', ()=>{
//     console.log(search_icon.value)
//     location.hash = '#search=' + search_icon.value;
// })


search_icon.addEventListener('input', ()=>{
    console.log(search_icon.value)
    location.hash = '#search=' + search_icon.value;
})



