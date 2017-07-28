'use strict';

let radiohead = require("./lib/radiohead.js");
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));


let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");


            app.get('/', (req, res) => {
               res.type('text/html');
               res.sendFile(__dirname + '/public/home.html'); 
            });
              
            app.get('/about', (req, res) => {
             res.type('text/plain');
             res.send('About page');
            });
            
            app.post('/detail', function(req,res){
              console.log(req.body);
                var header = 'Searching for: ' + req.body.name + '<br>';
                var found = radiohead.getOneAlbum(req.body.name);
                res.render("details", {name: req.body.name, result: found});
            });
            
            app.get('/delete', function(req,res){
              let result = radiohead.deleteAlbum(req.query.name);
              res.render('delete', {title: req.query.name, result: result});
            });
              
            app.use( (req,res) => {
             res.type('text/plain'); 
             res.status(404);
             res.send('404 - Not found');
            });
            
            app.get('/get', (req,res) => {
             let result = radiohead.getOneAlbum(req.query.name);
             res.render('details', {title: req.query.name, result: result });
            });
            
            app.listen(app.get('port'), function() {
              console.log('Express started');    
            });


