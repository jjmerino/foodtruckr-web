// Holds all information to draw a map
var MapModel = Backbone.Model.extend({

  initialize: function(){
    // set map defaults to san francisco, useful when no location is provided
    this.set('defaults', {center: [37.75,-122.44], zoom: 13});
  },

  // a facade for the leaflet getBounds function that ensures the map is instantiated
  getBounds: function(){
    var map = this.get('leaflet');

    if(!map){
      console.warn('Cannot get bounds without a map');
      return null;
    }

    return map.getBounds();
  }

});