'use strict';

//let radiohead = require("./lib/radiohead.js");
const express = require("express");
const bodyParser = require('body-parser');
var mongoose = require('mongoose');
const app = express();
var Radiohead = require("./models/albumSchema");

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));
app.use(require("body-parser").urlencoded({extended: true}));
app.use(require("body-parser").json());

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");
var albumSchema = require('./models/albumSchema.js');

            app.get('/', (req, res) => {
               res.type('text/html');
               Radiohead.find((err, result) => {
                    // output error if one occurred
                    if (err) {
                        console.log(err);
                    } else {
                        // otherwise output the array of documents
                        res.render("home", {albums: result});
                    }
                });
            });
              
            app.get('/about', (req, res) => {
             res.type('text/plain');
             res.send('About page');
            });
            
            app.post('/detail', function(req,res){
                console.log(req.body);
                var header = 'Searching for: ' + req.body.name + '<br>';
                //var found = radiohead.getOneAlbum(req.body.name);
                Radiohead.findOne({ name: req.body.name },(err, result) => {
                    console.log(result);
                    if (err) {
                        console.log(err);
                    } else {
                        // otherwise output the array of documents
                        res.render("details", {name: req.body.name, result});
                    }
                });
            });
            
            app.get('/delete', function(req,res){
              console.log(req.query);
              //let result = Radiohead.deleteAlbum(req.query.name);
              Radiohead.remove({ name: req.query.name },(err, result) => {
                    console.log(result);
                    if (err) {
                        console.log(err);
                    } else {
                        // otherwise output the array of documents
                        res.render("delete", {name: req.query.name, result});
                    }
                });
            });
              
            app.use( (req,res) => {
             res.type('text/plain'); 
             res.status(404);
             res.send('404 - Not found');
            });
            
            app.get('/get', (req,res) => {
             let result = Radiohead.getOneAlbum(req.query.name);
             res.render('details', {title: req.query.name, result: result });
            });
            
            app.listen(app.get('port'), function() {
              console.log('Express started');    
            });


