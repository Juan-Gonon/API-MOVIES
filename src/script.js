//DOM
const toggle = document.querySelector('.toggle');
const nav = document.querySelector('.head__nav');

const tradingMoví = document.querySelector('.tradingMovies');
const categories__cont = tradingMoví.querySelector('.categories__content');
const categories__ite = categories__cont.querySelectorAll('.categories__item');


//console.log(categories__ite)

toggle.onclick = ()=>{
    toggle.classList.toggle('active');
    nav.classList.toggle('active')
}

if(!window.matchMedia("(prefers-reduced-motion: reduce)").matches){
    scroller()
}

function scroller(){
    categories__ite.forEach((scroller)=>{
      
        scroller.setAttribute("data-animated", true);
       
    })
}

iconSearch.onclick = ()=>{
    iconSearch.classList.toggle('active');
    search.classList.toggle('active')
}

function toggleVideo(){
    const trailer = document.querySelector(".trailerVideo");
    const video = trailer.querySelector("iframe");
    console.log(video)
    trailer.classList.toggle("active");
    // video.currentTime=0;
    // video.pause();
    video.autoplay = 1;
    
}


