export  async function getInfo(city){
    const data = fetch(`http://api.weatherapi.com/v1/forecast.json?key=69861d6fcc6846d9b36141044231912&q=${city}&days=3`,{
        mode:'cors'
    })
    
    let [dataJSON] = await Promise.all([data])
    dataJSON = await dataJSON.json()
    
    return dataJSON
}

export function getLocation(){

    return new Promise((resolve,reject)=>{
        const data = navigator.geolocation.getCurrentPosition(
            position =>{
            
             if(position.coords.accuracy > 150){
                reject(0)
             }
             
               resolve( `${position.coords.latitude},${position.coords.longitude}`)
             
             
                
            },function(){
                
                 reject(0)
            },{
                enableHighAccuracy: true,
                maximumAge: 30000,
                timeout: 27000
            })
    })

    
}


 export function checkError(input){
    if(input.value.length == 0){
        throw new Error()
    }
 }