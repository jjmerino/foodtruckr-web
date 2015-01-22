// Holds all information to draw a map
var MapModel = Backbone.Model.extend({

  initialize: function(){
    // set map defaults to san francisco, useful when no location is provided
    this.set('defaults', {center: [37.75,-122.44], zoom: 13});
  },

  fetchTrucks: function(bounds){

    // if bounds are not provided, don't query the server
    if(!bounds){
      console.warn('Trucks can not be fetched without bounds');
      return;
    }
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();

    var url = 'http://foodtruckr-server.herokuapp.com/findInRect/'+sw.lat+'/'+ sw.lng+'/'+ ne.lat+'/'+ ne.lng;
    $.ajax({
      type:'GET',
      url: url,
      dataType:'json',
      success: function(resp){
        // on success mutate the trucks property, which will trigger mapModel's change:trucks event
        this.set('trucks',new Trucks(resp));

      }.bind(this) // binding is necessary to keep 'this' bound to the view
    })
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