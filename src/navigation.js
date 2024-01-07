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

}


function homePage(){
    console.log('home')
    getTrendingPreview()
    getCategoriesPreview()

    // const clases = main.classList;
    trading.classList.remove('active');
    tradingMovies.classList.remove('active');
    genericList.classList.add('inactive')
    categories__content.classList.remove('active')


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
}

function trendsPage(){
    console.log('TRENDS')
    trading.classList.add('active')
    tradingMovies.classList.add('active')
    categories__content.classList.remove('active')
}

categories__end.addEventListener('click', ()=>{
    location.hash = '#home'
})




