// Import module
const url = require('url')
const qs = require('querystring')

// Server
const serverHandle = function (req, res) {
    const route = url.parse(req.url)
    const path = route.pathname
    const params = qs.parse(route.query)

    
    res.writeHead(200, {'Content-Type': 'text/plain'});

    if (path === '/') {
        res.write('This is my first page with nodeJs')
    }else if (path === '/hello' && 'name' in params && params['name'] !=='marvin' && params['name'] !=='') {
        res.write('Hello ' + params['name'])
    }else if (path === '/hello' && params['name'] ==='marvin') {
        res.write('My name is marvin ! I will practice nodeJs cause it is fun')
    }else{
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('404 Not Found\n');
    }

    res.end();
}


module.exports =  {
    serverHandle: serverHandle
}
