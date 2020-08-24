const https = require('https');

module.exports = {

    urlPaths : ['/weather_location_data'],    

    runCorrespondingFunction(url, data, response){

        let htmlFile;
    
        switch (url) {
            case '/weather_location_data':
                this.fetchWeatherUsingMapCoOrds(data, response)
                break;
        
            default:
                htmlFile = 'notFound.html'
                //console.log('not found')
                break;
        }        
    
    },

    fetchWeatherUsingMapCoOrds(dataType, res){
        let fetchUrl;

        if(dataType.lat){
            let latLng = dataType;
            fetchUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latLng.lat}&lon=${latLng.lng}&units=metric&APPID=13a0fb6081e0c3aaca90a66489e0965c`;
        }

        if(dataType.cityName){
            fetchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${dataType.cityName}&units=metric&APPID=13a0fb6081e0c3aaca90a66489e0965c`;
        }        
        
        https.get(fetchUrl, response => {

            response.setEncoding("utf8");
            let body = "";

            response.on("data", data => {
                body += data;
            });

            response.on("end", () => {
                body = JSON.parse(body);
                console.log(body);
              
                res.writeHead(200, {'Content-Type': 'application/json'});
                //    response.write(JSON.stringify(body)); //write a response
                res.end(JSON.stringify(body)); // write and end the response
              });
        })
        
    }

}