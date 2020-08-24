var http = require('http');
const path = require('path');
const url = require('url')
const processHtml = require('./app_modules/processHtml')
const processXHR = require('./app_modules/processXHR');
require('dotenv').config()



//create a server object:
const server = http.createServer(function (req, res) {
    
    //  check if request is AJAX
    if(req.headers['x-requested-with'] === 'XMLHttpRequest'){        

        processXHR(req, res);
    }
    else{
        if(req.method == "GET"){
            processHtml(req, res)
        }
    }

})


server.listen(3000, function(){
    console.log("listening on port 3000"); //the server object listens on port 3000
   });