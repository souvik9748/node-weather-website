console.log('Simple js from public/js folder')


const indexForm=document.querySelector('form')
const inputData=document.querySelector('input')
const message1=document.querySelector('#message-1')
const message2=document.querySelector('#message-2')
indexForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    message1.textContent="Loading..."
    message2.textContent=""
    fetch('/forecast?address='+inputData.value).then((response)=>{
        response.json().then((data)=>
        {
            if(data.error)
            {
                message1.textContent="Error: "+data.error
            }
            else{
                message1.textContent="Location: "+data.location
                message2.textContent="Weather Condition is "+data.weather_descriptions+". Temperature is "+data.temperature+"°C but it Feels Like "+data.feelslike+"°C."
            }
        })
        })
    
})