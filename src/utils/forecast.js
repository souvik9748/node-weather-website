const request=require('request')

 const forecast=(lat,long,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=60f129c4d6c4bede6c3c75d8da06a8a0&query='+lat+','+long
    request({url:url, json:true},(error,response)=>
    {
        if(error)
        {
            callback('Could not connect!',undefined)
        }
        else if(response.body.error)
        {
            callback('Address not found! Please search again!',undefined)
        }
        else{
            callback(undefined,{
                location: response.body.location.region+','+response.body.location.country,
                weather_descriptions: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
 }
 module.exports={forecast}