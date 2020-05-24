
const request=require('request');

const forecast=(latitude,longitude,callback)=>{

    //const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address + '.json?access_token=pk.eyJ1IjoicHJhaHVsIiwiYSI6ImNrYWdkY3F5eTAwcm0ycnF0MWxwYmlhaWcifQ.ukG_t813U1EYuZ-zB5sFIg&limit=1'
    //const url='http://api.weatherstack.com/current?access_key=ccd851ebc156444f9d170af97e9eaa2&query=' + latitude + ',' + longitude + '&units=f'
    const url='http://api.weatherstack.com/current?access_key=ccd851ebc156444f9d170af97e9eaa2b&query='+ latitude + ',' + longitude 

    request({url,json:true},(error,{body})=>{
  
      if(error){
        callback('Unable to connect location service',undefined);
      }
      else if(body.error){
        callback('Unable to find location.Try another search',undefined);
      }
      else{
        callback(undefined,'It is currently'+ body.current.temperature + 'degress.out.There is a '+ body.current.weather_code + '% chance of rain')
      }
  
    })
  
  
  
  }


  module.exports =forecast;
  