const express = require ('express')
const bodyParser = require('body-parser')
const app = express ()
const cacheServer = require('./cache')


app.use (bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))


app.use ('/teste' , function (req,res) {
    res.send ({message: 'Primera parte ok'})
})

 app.post('/car' , function (req,res) {
   
  cacheServer.verificoPlacaEnCache(req.body,res)
  
 })
 app.post('/car' , function (req,res) {
 
    cacheServer.verificoRenavamEnCache(req.body,res)
 })
 


app.listen (5000, function(){
    console.log('prueba redis ok')
}
)