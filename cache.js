const redis = require('redis-promisify')
const redisClient = redis.createClient()
const dados = require ('./car.json')
const carDefault = ()=>{
    return{
        placa:"ABC",
        renavam:123
    }
}
const debito1 = () =>{
  return {  "debitos": [
        {
            "valor": 200,
            "descricao": "Multa A"
        },
        {
            "valor": 500,
            "descricao": "Multa B"
        }
    ]
}
}


const verificoPlacaEnCache = (car,callback) => {
     redisClient.get(`${car.placa}`, (err,obj) => {
          if (obj) {
            console.log('Encontrado en la cache')
            console.log(obj)
            callback.send(Find(car))
             
          }
        else{
         console.log('Buscando información fuera de la cache')
         redisClient.setex(`${car.placa}`, 30, JSON.stringify(car))
         console.log(car)
         callback.send(Find(car))                                    
        }})}
    
   const verificoRenavamEnCache = (car,callback) => {
         redisClient.get(`${car.renavam}`, (err, obj) => {
            if (obj) {
                console.log('Encontrado en la cache')
                console.log(obj)
                const kk = Find(obj) 
                callback.send(kk)
            }
            else{
            console.log('Buscando información fuera de la cache')
            redisClient.setex(`${car.renavam}`,30, JSON.stringify (car))
            const kk = Find(obj) 
            callback.send(kk)
            }})}


   const Find = (obj) => {
     if(`${carDefault.placa}` === "ABC" && obj.placa === "ABC"){
         return JSON.parse(debito1())
     }
    //  if(car.placa === 'ABC' && car.renavam === 456){
    //     return{
    //         placa: 'ABC',
    //         renavam: 456,
    //         debitos: [
    //             {
    //                valor: 300,
    //                descricao:"Multa A"
    //             },
    //             {
    //                 valor: 356,
    //                 descricao:"Multa B"
    //             }
                
    //         ]
    //     }
    //  }
    //  if(car.placa === 'CDE' && car.renavam === 123){
    //     return{
    //         placa: 'CDE',
    //         renavam: 123,
    //         debitos: [
    //             {
    //                valor: 500,
    //                descricao:"Multa C"
    //             },
    //             {
    //                 valor: 800,
    //                 descricao:"Multa D"
    //             }
                
    //         ]
    //     }
    //  }
    //  if(car.placa === 'CDE' && car.renavam === 456){
    //     return{
    //         placa: 'CDE',
    //         renavam: 456,
    //         debitos: [
    //             {
    //                valor: 100,
    //                descricao:"Multa A"
    //             },
    //             {
    //                 valor: 400,
    //                 descricao:"Multa D"
    //             }
                
    //         ]
    //     }
    //  }
     else{
        console.log('No se encontro esa informacion en el servidor')
   }
   
//  })
}


 module.exports = { verificoPlacaEnCache,Find,verificoRenavamEnCache}


