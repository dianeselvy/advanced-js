var albums = [
    {name:"OK Computer", songs:"12", year:"1997"},
    {name:"In Rainbows", songs:"10", year:"2009"},
    {name:"Hail To The Thief", songs:"14", year:"2003"},
    {name:"A Moon Shaped Pool", songs:"11", year:"2016"},
    {name:"Pablo Honey", songs:"12", year:"1993"}
];

exports.getAlbums = function() {
    var idx = Math.floor(Math.random() * albums.length);
    return albums[idx];
};