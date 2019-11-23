// Import a module
var http = require('http')
const handlesMyName = require('./handles')

// Create Server
http.createServer(handlesMyName.serverHandle).listen(8081)

// ./node_modules/.bin/nodemon hello.js or npm run start

//http://localhost:8081/
//http://localhost:8081/hello?name=marvin
//http://localhost:8081/hello?name=tim
