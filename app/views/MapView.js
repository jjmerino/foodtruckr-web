var MapView = Backbone.View.extend({

  tagName: "div",

  // set classes of containing element.
  className: "map",

  initialize: function() {

    // if mapModel's truck collection changes, re render
    this.collection.on('change',function(){
      this.render();
    },this);

    // on initialize, render
    this.render();
  },

  render: function(){

    // convenience variables
    var defaults = this.model.get('defaults');
    var trucks = this.collection;
    var map = this.model.get('leaflet');

    // create leaflet map if needed
    if(!map){

      // mapbox styles require access token and id
      L.mapbox.accessToken = 'pk.eyJ1Ijoiam9tZXJpbm9nIiwiYSI6InNGT0tvZWsifQ.engPCXKX_6z8dmvrtlvWng';
      map = L.mapbox.map(this.$el[0],'jomerinog.l05n9la7',{zoomControl: false});

      // zoom can be set syncronously as it doesn't rely on element size
      map.setZoom(defaults.zoom);

      // make panning async in next event loop to ensure that the element is already inserted when leaflet queries it's dimensions
      setTimeout(function(){
        map.panTo(L.latLng(defaults.center));
      },0);

      // store the reference
      this.model.set('leaflet',map);
    }

    // create an array to keep track of previously drawn markers.
    this.markers = this.markers || [];

    // clear markers from map
    _.each(this.markers, function(marker){
      map.removeLayer(marker);
    });

    // remove markers from array
    this.markers = [];

    // create markers and event handlers for each truck
    trucks.each(function(truck, index){

      // create the marker at lat,lng
      var marker = L.marker(
        [truck.attributes.latitude, truck.attributes.longitude]
      );

      // make mouse hover toggle the highlight property so that this and other views can react
      marker.on('mouseover',function(){
        truck.highlight();
      });
      marker.on('mouseout', function(){
        truck.removeHighlight();
      });

      marker.on('click', function(){
        truck.select();
      });

      // set default opacity low to make selected markers stand out
      marker.setOpacity(0.5);

      // this view reacts to truck property changes either
      truck.on('change',function(newTruck){

        // highlighted trucks' markers have more opacity
        if(newTruck.attributes.highlight){
          marker.setOpacity(1);
        } else {
          marker.setOpacity(0.5);
        }

      });

      // add the marker to the map
      marker.addTo(map);

      // keep track of marker
      this.markers.push(marker);

      // bind "each"'s callback to the view for easy access.
    }.bind(this));


  }

});