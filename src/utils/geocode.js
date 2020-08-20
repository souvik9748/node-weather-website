const request=require('request')
 const geocode=(address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=232de1db74c8874e59728c4f8c6b0c82&query='+encodeURIComponent(address)
    request({url:url, json:true},(error,response)=>
    {
        if(error)
        {
            callback('Could not connect!',undefined)
        }
        else if(response.body.error)
        {
            callback('Invalid Query! Query must have 3 characters!',undefined)
        }
        else if(response.body.data.length===0)
        {
            callback('Address not found! Please search again!',undefined)
        }
        else{
            callback(undefined,{
                latitude: response.body.data[0].latitude,
                longitude: response.body.data[0].longitude,
                location: response.body.data[0].region+','+response.body.data[0].country
            })
        }
    })
 }
 module.exports={geocode}