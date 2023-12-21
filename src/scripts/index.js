import * as MyApp from "./info";
import '../styles/styles.css';
import * as DOM from "./DOM";
DOM.load()
let data;
const searchInput = document.querySelector('.search')
const SearchIcon = document.querySelector('.searchImg')
const cancelIcon  = document.querySelector('.cancelImg')
const slides = document.querySelectorAll('.slides .slide')
const selection = Array.from(DOM.main.querySelectorAll('.header .selection div'))
DOM.loadIcons()

try{
    const currentLocation =await MyApp.getLocation()
     data = MyApp.getInfo(currentLocation)
    
    
}
catch{
    data = await MyApp.getInfo('debrecen') 
}
attachData(data)
DOM.RenderToday(data)

DOM.unload()



SearchIcon.addEventListener('click',async ()=>{
    let inp = searchInput.value
    DOM.load()
    const data =  await MyApp.getInfo(inp)
    attachData(data)
DOM.RenderToday(data)

selection.forEach(item =>{
    item.classList.add('unselected')
    item.classList.remove('selected')
})
selection[0].classList.add('selected')

selection[0].classList.remove('unselected')

    searchInput.value = ''
    DOM.unload()
    

})
cancelIcon.addEventListener('click' , ()=>{
    
})


function attachData(data){
    for(let i = 0 ; i < data.forecast.forecastday.length ; i++ )
{

    
selection[i].addEventListener('click', ()=>{
    selection.forEach(item =>{
        item.classList.add('unselected')
        item.classList.remove('selected')
    })
    selection[i].classList.add('selected')
    selection[i].classList.remove('unselected')
    if(i == 0){
        DOM.RenderToday(data)
    }else{
        DOM.RenderSelectedDate(data.forecast.forecastday[i])
    }
   
populateSlides(slides,data,i)
DOM.loadCaoursel()
    
})
}
}


DOM.loadCaoursel()
populateSlides(slides,data)
function populateSlides(slides,data,defaultDay=0,degreeTypeIcon='C'){
    for(let i = 0 ; i < slides.length ; i++)
    {
        Array.from(slides[i].children).forEach(el=>
            {
                slides[i].removeChild(el)
            })
        slides[i].appendChild(createSlide())
        let img = slides[i].querySelector('img')
        let hour = slides[i].querySelector('.hour')
        let weather = slides[i].querySelector('.weather .number')
        let degreeType = slides[i].querySelector('.weather .degreeType')
        degreeType.textContent = degreeTypeIcon
        let time = new Date(data.forecast.forecastday[defaultDay].hour[i].time)
        time = `${String(time.getHours()).padStart(2, '0')}:${String(time.getMinutes()).padStart(2, '0')}`
        img.src = data.forecast.forecastday[defaultDay].hour[i].condition.icon
        hour.textContent =  time
        weather.textContent =  data.forecast.forecastday[defaultDay].hour[i].temp_c
    }
        
    
}


function createSlide(){

    let slideContainer = document.createElement('div')
    slideContainer.classList.add('slide-content')
    let img = document.createElement('img')
    let hour = document.createElement('div')
    hour.classList.add('hour')
    let weather = document.createElement('div')
    weather.classList.add('weather')
    let number = document.createElement('span')
    number.classList.add('number')

    let degree = document.createElement('span')
    degree.classList.add('degree')
    degree.textContent = 'o'

    let degreeType = document.createElement('span')
    degreeType.classList.add('degreeType')

    let degreeDiv = document.createElement('span')
    degreeDiv.appendChild(degree)
    degreeDiv.appendChild(degreeType)
    degreeDiv.classList.add('degreeDiv')
    weather.appendChild(number)
    weather.appendChild(degreeDiv)
    

    slideContainer.appendChild(img)
    slideContainer.appendChild(hour)
    slideContainer.appendChild(weather)
    return slideContainer
}






