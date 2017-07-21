var albums = [
    {name:"OK Computer", songs:"12", year:"1997"},
    {name:"In Rainbows", songs:"10", year:"2009"},
    {name:"Hail To The Thief", songs:"14", year:"2003"},
    {name:"A Moon Shaped Pool", songs:"11", year:"2016"},
    {name:"Pablo Honey", songs:"12", year:"1993"}
];

exports.getAllAlbums = () => {
    return albums;
};

exports.getOneAlbum = (name) => {
    return albums.find((item) => {
        return item.name === name;
    });
};

exports.deleteAlbum = (name) => {
    const oldLength = albums.length;
    albums = albums.filter((item) => {
        return item.name !== name;
    });
    return {deleted: oldLength !== albums.length, total: albums.length};
};