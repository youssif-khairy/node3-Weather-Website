const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express() // as it is function

//paths for express
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.use(express.static(publicDir))
//setup handlebars engine
app.set('view engine','hbs')//to set value to property
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)



app.get('',(request,response)=>{
//what to send back when he visit our page
    response.render('index.hbs',{
        title:'Weather',
        name:'youssif aly khairy'
    })
}) 
app.get('/help',(request,response)=>{
    //what to send back when he visit our page
        response.render('help.hbs',{
            message:'This is dynamic message',
            title:'help',
            name:'youssif aly hbs'
        })
    }) 
app.get('/about',(request,response)=>{
    //what to send back when he visit our page
        response.render('about.hbs',{
            title:'About me',
            name:'youssif aly khairy'
        })
    }) 

app.get('/weather',(req,res)=>{
//what to send back when he visit our page

    if(!req.query.address){
       return res.send({
            error:'you must provide address'
        })
    }
    //This is endpoint as it the point of interacation between api and our web server (Express)
    geocode(req.query.address,(error,{lat,long,name}={})=>{
        if(error){
           return res.send({
            error
        })
        }
        forecast(lat, long, (error, forecastData) => {
            if (error)
                return res.send({
                    error
                })
                res.send({
                    name,
                    forecast:forecastData,
                    address:req.query.address
                })
          })
    }) 


    

})  
app.get('/help/*',(req,res)=>{ 
    
    res.render('404Error',{
        errorMessage:'Help article not found',
        title:'404',
        name:'youssif aly khairy'
    })
})

app.get('*',(req,res)=>{ //any
    res.render('404Error',{
        errorMessage:'Page not found',
        title:'404',
        name:'youssif aly khairy'
    })
})


app.listen(3000,()=>{
    console.log('server is up on port 3000')
}) //to start server

