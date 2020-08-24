module.exports = {

    urlPaths : ['/', '/write'],

    imageExtensions : ['gif', 'jpeg', 'jpg', 'png'],

    route(url){

        let htmlFile;
    
        switch (url) {
            case '/':
                htmlFile = 'index.html'
                break;
        
            default:
                htmlFile = 'notFound.html'                
                break;
        }
    
        return htmlFile;
    
    }

}