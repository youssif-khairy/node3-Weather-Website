const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoieW91c3NpZmFseSIsImEiOiJjazdrem5ucXowMmlzM2ZxZXhzdXh6NjVqIn0.ucO26N3YHM44HucWMCWSRg&limit=1'
    request({url,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect to location service')
        }else if(body.features == 0){
            callback('Unable to find location')
        }else{
        callback(undefined,
            {lat:body.features[0].center[0]
            ,long:body.features[0].center[1]
            ,name:body.features[0].place_name})
        }
    })

}

module.exports = geocode