var expect = require("chai").expect;
var albums = require("../lib/radiohead");

describe("Album module", () => {
 it("returns requested albums", function() {
   var result = albums.getOneAlbum("Pablo Honey");
   expect(result).to.deep.equal({name:"Pablo Honey", songs:"12", year:"1993"});
 });
 
 it("fails w/ invalid album", () => {
   var result = albums.getOneAlbum("fake");
   expect(result).to.be.undefined;
 });
 
 
  it("deletes requested albums", function() {
   var result = albums.deleteAlbum("Pablo Honey");
   expect(result.deleted).to.be.true;
 });
 
 it("delete fails for invalid album", () => {
   var result = albums.deleteAlbum("fake");
   expect(result.deleted).to.be.false;
 });
 
 
 
   it("adds requested albums", function() {
   var result = albums.addAlbum({name:"Kid A", songs:"10", year:"1997"});
   expect(result.added).to.be.true;
 });
 
 it("add fails for invalid album", () => {
   var result = albums.addAlbum({name:"OK Computer", songs:"12", year:"1997"});
   expect(result.added).to.be.false;
 });
 
 
});