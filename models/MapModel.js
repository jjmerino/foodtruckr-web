// Holds all information to draw a map
var MapModel = Backbone.Model.extend({

  initialize: function(){
    this.set('defaults', {center: [37.75,-122.44], zoom: 13});
  },
  getBounds: function(){
    var map = this.get('leaflet');
    if(!map){
      console.warn('Cannot get bounds without a map');
      return null;
    }
    return map.getBounds();
  }

});