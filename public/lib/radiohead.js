var albums = [
    "OK Computer",
    "In Rainbows",
    "Hail To The Thief",
    "A Moon Shaped Pool",
    "Pablo Honey"
];

exports.getAlbums = function() {
    var idx = Math.floor(Math.random() * albums.length);
    return albums[idx];
};