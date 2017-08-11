var mongoose = require('mongoose');

var connectionString = "mongodb://dianeselvy:thatshot2@ds013182.mlab.com:13182/itc230";
var options = { server: { socketOptions: { keepAlive:1, connectTimeoutMS: 30000 } } };
mongoose.connect(connectionString, options);


var conn = mongoose.connection; 
conn.on('error', console.error.bind(console, 'connection error:'));


var albumSchema = mongoose.Schema({
    name: String,
    songs: Number,
    year: Number,
});

albumSchema.methods.getAlbum = function(){
    return this.name;
};

var Radiohead = mongoose.model('Radiohead', albumSchema);
module.exports = Radiohead;