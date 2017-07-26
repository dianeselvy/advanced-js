'use strict'

let radiohead = require("./lib/radiohead.js");
const express = require("express");
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));

var http = require("http"),
fs = require("fs"), 
qs = require("querystring"); 


function serveStatic(res, path, contentType, responseCode){
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err,data) {
        if(err){
            res.writeHead(500, {'Content-Type' : 'text/plain'});
            res.end('500 - Internal Error');
        }else {
            res.writeHead(responseCode, {'Content-Type': contentType});
            res.end(data);
        }
    });
}

http.createServer((req,res) => {
    
  let url = req.url.split("?");
  let query = qs.parse(url[1]);
  let path = url[0].toLowerCase();

    //var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    
        switch(path) {
            case '/': 
              serveStatic(res, '/public/home.html', 'text/html');
              break;
              
            case '/about':
              res.writeHead(200, {'Content-Type': 'text/plain'});
              res.end('about');
              break;
              
            case '/detail':
              let singleAlbum = radiohead.getOneAlbum(query.name);
              res.writeHead(200, {'Content-Type': 'text/plain'});
              let results = (singleAlbum) ? JSON.stringify(singleAlbum) : "Not records found";
              res.end('Results for ' + query.name + "\n" + results);
              break;
              
            case '/delete':
              res.writeHead(200, {'Content-Type': 'text/plain'});
              let result = radiohead.deleteAlbum(query.name);
              var word = (!result.deleted) ? " not " : ""; 
              res.end(query.name + word + " removed. " + result.total + " total albums");
              break;
              
            default:
              res.writeHead(404, {'Content-Type': 'text/plain'});
              res.end('404:Page not found.');
               }
    
}).listen(process.env.PORT || 3000);

console.log('Server started on localhost:3000; press Ctrl-C to terminate...');