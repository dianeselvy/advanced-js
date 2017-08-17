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
app.use('/api', require("cors")());
app.use((err, req, res, next) => {
  console.log(err);
});

let handlebars =  require("express-handlebars");
app.engine(".html", handlebars({extname: '.html'}));
app.set("view engine", ".html");
var albumSchema = require('./models/albumSchema.js');

            app.get('/', (req, res, next) => {
               res.type('text/html');
               Radiohead.find((err, result) => {
                    console.log(result);
            if (err) return next(err);
                        res.render("home", {'albums': {albums: JSON.stringify(result)}});
                    
                });
            });
              
            app.get('/about', (req, res) => {
             res.type('text/plain');
             res.send('About page');
            });
            
            app.get('/api/v1/add/:name', (req,res,next) => {
                let name = req.params.name;
                console.log(name);
                Radiohead.findOne({name: name}, (err, result) =>{
                    if (err || !result) return next(err);
                    res.json(result);
                });
            });
            
            app.get('/api/v1/radiohead', (req,res,next) => {
                Radiohead.find((err, results) => {
                    if (err || !results) return next(err);
                    res.json(results);
                });
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
            
            app.get('/api/v1/delete/:id', (req,res,next) => {
              //let result = Radiohead.deleteAlbum(req.query.name);
              Radiohead.remove({"_id":req.params.id},(err, result) => {
                    if (err) return next(err);
                    res.json({"deleted": result.result.n});
                });
            });
            
            app.get('/api/v1/add/:name/:songs/:year', (req,res,next) => {
                let name = req.params.name;
                Radiohead.update({name:name}, {name:name, songs:req.params.songs, year:req.params.songs}, {upsert: true}, (err, result) => {
                    if (err) return next(err);
                    res.json({updated: result.nModified});
                })
            })
              
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


