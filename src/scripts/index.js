import * as MyApp from "./info";
import '../styles/styles.css';
import * as DOM from "./DOM";
DOM.load()
let data;
const searchInput = document.querySelector('.search')
const SearchIcon = document.querySelector('.searchImg')
const cancelIcon  = document.querySelector('.cancelImg')
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
    
})
}
}







