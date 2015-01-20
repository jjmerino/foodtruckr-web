var MapView = Backbone.View.extend({

  tagName: "div",
  className: "map",
  initialize: function() {

    this.model.on('change:trucks',function(){
      this.render();

    },this);

    this.render();
  },

  render: function(){
    var defaults = this.model.get('defaults');
    var trucks = this.model.get('trucks');


    var map = this.model.get('map');
    if(map === undefined){
      throw "Map model not set";
    }
    if(map === null){

      L.mapbox.accessToken = 'pk.eyJ1Ijoiam9tZXJpbm9nIiwiYSI6InNGT0tvZWsifQ.engPCXKX_6z8dmvrtlvWng';
      map = L.mapbox.map(this.$el[0],'jomerinog.l05n9la7',{zoomControl: false});
      // Provide your access token
      this.model.set('map',map);
      map.setZoom(defaults.zoom);

      // Make panning async in next event loop to ensure that Leaflet scales correctly
      setTimeout(function(){
        map.panTo(L.latLng(defaults.center));
      },0);

    }

    // keep track of drawn markers.
    this.markers = this.markers || [];

    // clear markers from map
    _.each(this.markers, function(marker){
      map.removeLayer(marker);
    });

    // remove markers from array
    this.markers = [];

    trucks.each(function(truck, index){
      console.log('create a maker');
      var marker = L.marker(
        [truck.attributes.latitude, truck.attributes.longitude]
      );
      marker.addTo(map);
      this.markers.push(marker);
    }.bind(this));


  }

});