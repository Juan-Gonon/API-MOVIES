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
    trailer.classList.toggle("active");
    // video.currentTime=0;
    // video.pause();
    video.autoplay = 1;
    
}

langs.onclick = ()=>{
    langs.classList.toggle('active')
}


// span1.addEventListener('click', ()=>{
//     // console.log(span1)
// })

function selectLanguage(idiomas, spanLangs){
    
    for(let i=0; i<idiomas.length; i++){
        // console.log(spanLangs[i])
        // spanLangs[i].id = idiomas[i]
        spanLangs[i].setAttribute('id', idiomas[i])

        spanLangs[i].onclick = ()=>{
            API_LANG = spanLangs[i].id;
            api.defaults.params.language = API_LANG;
            homePage()
        }
    }
}

