var http = require("http");
http.createServer(function(request, response) {
console.log('Server Up and Running');
response.writeHead(200, {"Content-Type": "text/plain"});
response.write("Hello World");
response.end();
}).listen(8666);

