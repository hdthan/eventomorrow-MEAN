const http = require('http');
var docFile = require("fs").readFile;
const hostname = '127.0.0.1';
const port = 3000;
docFile('index.html', (err, htmlData) => {
  if(err){
    throw err;
  }
  const server = http.createServer((req,res) => {
    res.statusCode = 200;
    res.setHeader('Content-type', 'html');
    res.write(htmlData);
    res.end();
  });

  server.listen(port, hostname,()=>{
    console.log('Server listen on port '+ port);
  })
})
