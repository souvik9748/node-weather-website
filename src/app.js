const path=require('path')
const express=require('express')
const hbs=require('hbs')

const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
const { response } = require('express')

const app=express()

//set up static directory to serve
const pathToPublicDirectory=path.join(__dirname,'../public')
app.use(express.static(pathToPublicDirectory))

//define path for express config
app.set('view engine','hbs')
//have to set the path of the views folder otherwise compiler will find it in the /src/views folder
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))


app.get('',(req,res)=>{
    res.render('index',{name: 'The home page', content:'You can use this app to get weather information!',creator:'Souvik'})
})
app.get('/about',(req,res)=>{
    res.render('about',{name:'About page',content:'This is a Weather App. Here we have used weatherstack.com and positionstack.com APIs.',creator:'Souvik'})
})
app.get('/help',(req,res)=>{
    res.render('help',{name:'Help page',content:'Atmanirbhar bano!',creator:'Souvik'})
})

app.get('/forecast',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'Please provide address'
        })
    }
    let address=req.query.address
    geocode.geocode(address,(error,response)=>
    {
        if(error)
        {
            return res.send({error:error})
        }
        forecast.forecast(response.latitude,response.longitude,(error,response)=>{
            if(error)
            {
                return res.send({error:error})
            }
            res.send(response)
        })
    })
    
})
app.get('/about_creator',(req,res)=>{
    res.render('about_creator',{name:'About Creator',content:'This page gives a little information about the creator!',creator:'Souvik'})
})
app.get('/help/*',(req,res)=>{
    res.render('error',{name:'Error 404!!',content:'Help not found!',creator:'Souvik'})
})
app.get('*',(req,res)=>{
    res.render('error',{name:'Error 404!!',content:'Page not found!',creator:'Souvik'})
})

app.listen(3000,()=>{
    console.log('Server is up and running...')
})