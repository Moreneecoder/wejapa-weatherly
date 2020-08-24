const url = require('url')
const ajaxRouteRenderer = require('./ajaxRoute')

module.exports = function (request, response){
    
    var parsedUrl = url.parse(request.url, true)
    var queryData = parsedUrl.query;    

    if(ajaxRouteRenderer.urlPaths.includes(parsedUrl.pathname)){
        ajaxRouteRenderer.runCorrespondingFunction(parsedUrl.pathname, queryData, response)
    }
}