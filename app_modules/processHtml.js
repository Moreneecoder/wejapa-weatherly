const routeRenderer = require('./route')
const fs = require('fs');
const path = require('path')

module.exports = function(request, response){
    let file = routeRenderer.route(request.url)
    const route = path.join(__dirname, '../public', file)

    if(routeRenderer.urlPaths.includes(request.url)){

        fs.readFile(route, 'UTF-8', function(err, html) {
            if(err){
                console.log(err)
                response.end()
                return
            }
            response.writeHead(200, {'Content-Type': 'text/html'})
            response.end(html)
        })
    }
    else if(request.url.match(`\.css$`)){
        let cssPath = path.join(__dirname, '../', request.url)
        console.log(cssPath);
        const filestream = fs.createReadStream(cssPath, 'UTF-8');
        response.writeHead(200, {'Content-Type': 'text/css'});
        filestream.pipe(response);
    }
    else if(request.url.match(`\.js$`)){
        let jsPath = path.join(__dirname, '../', request.url)
        console.log(jsPath);
        const filestream = fs.createReadStream(jsPath, 'UTF-8');
        response.writeHead(200, {'Content-Type': 'text/javascript'})
        filestream.pipe(response);
    }
    else if(request.url.match(`\.jpg$`)){
        let jsPath = path.join(__dirname, '../', request.url)
        console.log(jsPath);
        const filestream = fs.createReadStream(jsPath);
        response.writeHead(200, {'Content-Type': 'image/jpg'})
        filestream.pipe(response);
    }
    else if(request.url.match(`\.png$`)){
        let jsPath = path.join(__dirname, '../', request.url)
        console.log(jsPath);
        const filestream = fs.createReadStream(jsPath);
        response.writeHead(200, {'Content-Type': 'image/png'})
        filestream.pipe(response);
    } 
}