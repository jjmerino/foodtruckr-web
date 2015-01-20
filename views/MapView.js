var MapView = Backbone.View.extend({

  tagName: "div",
  className: "mapwrapper",
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
    console.log('rendering');
    if(map === null){

      var mapEl = $('<div class="map">');
      this.$el.append(mapEl);
      L.mapbox.accessToken = 'pk.eyJ1Ijoiam9tZXJpbm9nIiwiYSI6InNGT0tvZWsifQ.engPCXKX_6z8dmvrtlvWng';
      map = L.mapbox.map(mapEl[0],'jomerinog.l05n9la7');
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
      var marker = L.Marker(
        [truck.attributes.latitude, truck.attributes.longitude]
      );
      this.markers.push(marker);
    }.bind(this));


  }

});