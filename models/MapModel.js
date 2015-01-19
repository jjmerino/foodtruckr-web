// Holds all information to draw a map
var MapModel = Backbone.Model.extend({

  initialize: function(){
    this.set('trucks', new Trucks([]));
    this.set('defaults', {center: [37.75,-122.44], zoom: 13});
    this.set('map', null);
  },
  fetchTrucks: function(){
    var map = this.get('map');
    if(map === null){
      console.warn('Cannot fetch trucks without map location');
      return;
    }
    var bounds = map.getBounds();
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var url = 'http://localhost:8081/findInRect/'+sw.lat()+'/'+ sw.lng()+'/'+ ne.lat()+'/'+ ne.lng();
    $.ajax({
      type:'GET',
      url: url,
      dataType:'json',
      success: function(resp){
        this.set('trucks', new Trucks(resp));
      }.bind(this)
    })
  }

});