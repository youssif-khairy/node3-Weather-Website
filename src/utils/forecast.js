const request = require('request')
const forecast = (lang,lat,callback)=>{
const url = 'https://api.darksky.net/forecast/ed128b2e5c4c9646626d11e6f9b34688/'+lang+','+lat+'?units=si'

request({url,json:true},(error,{body})=>{
    if (error){
        callback('Unable to connect to weather service')
    }else if(body.error){
        callback(body.error)
    }else{
    callback(undefined,
        body.daily.data[0].summary + 
        ' It is currently '+body.currently.temperature+' degree out.'+
        'There is a '+body.currently.precipProbability+'% chance of rain')
    }
})
}

module.exports = forecast