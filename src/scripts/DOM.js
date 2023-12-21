import searchPhoto from '../photos/magnify.png'
import cancelIcon from '../photos/alpha-x-circle.png'
import Loading from '../photos/giphy.gif'
export const main = document.querySelector('.main-container')
const loading = document.querySelector('.loading')
const loadingImg = document.querySelector('.loadImg img')




export function loadIcons(){
const searchImg = document.querySelector('.searchImg')
const CancelImg = document.querySelector('.cancelImg')
searchImg.src = searchPhoto
CancelImg.src = cancelIcon
}

const sidebar = document.querySelector('.sidebar')
export function mainImage(url){
const main = sidebar.querySelector('.main .mainImg')
main.src = url
}

const mainNumber = sidebar.querySelector('.main .mainDegree .number-container[class$=number]')
    const minDegree = sidebar.querySelector('.main .mainDegree .number-container[class$=min]')
    const maxDegree = sidebar.querySelector('.main .mainDegree .number-container[class$=max]')

 function mainDegree(currentDegree,Degree = 'C'){
   
    
    const text = mainNumber.querySelector('.number')
    
    minDegree.classList.add('not-active')
    maxDegree.classList.add('not-active')
    mainNumber.classList.remove('not-active')

    const degree = mainNumber.querySelector('.degreeType')
    degree.textContent = Degree
    text.textContent = currentDegree
}
 function mainFutureDegree(min , max , Degree = 'C'){
    
    
    minDegree.classList.remove('not-active')
    maxDegree.classList.remove('not-active')
    mainNumber.classList.add('not-active')
    let maxNum = maxDegree.querySelector('.number-max')
    let minNum = minDegree.querySelector('.number-min')

    const minDegreeType = minDegree.querySelector('.degreeType')
    const maxDegreeType = maxDegree.querySelector('.degreeType')
    minDegreeType.textContent = Degree
    maxDegreeType.textContent = Degree
    minNum.textContent = min
    maxNum.textContent = max
 }
 function CurrentDay(time){
    const timeDiv = sidebar.querySelector('.main .mainTime .day')
    
    const options = { 
        weekday: "long",
  month: "long",
  day: "numeric",
    };
    let d = new Date(time)
timeDiv.textContent = `${new Intl.DateTimeFormat("en-US", options).format(d)} `;

}

const selection = main.querySelectorAll('.header .selection div')

export function RenderSelectedDate(data){
let newpic = data.day.condition.icon.replace('64x64','128x128')
mainImage(newpic)
mainFutureDegree(data.day.mintemp_c , data.day.maxtemp_c)

let d = new Date(data.date)

CurrentDay(d)
    

}
export function RenderToday(data){
    let newpic = data.current.condition.icon.replace('64x64','128x128')
mainImage(newpic)
mainDegree(data.current.temp_c)
let d = new Date(data.current.last_updated)
CurrentDay(d)
console.log(data)
}


export function load(){
    loadingImg.src = Loading
    loading.classList.add('active')
}
export function unload(){
    loading.classList.remove('active')
}