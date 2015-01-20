var MapView = Backbone.View.extend({

  tagName: "div",
  className: "map col-md-8",
  initialize: function() {

    this.model.on('change:trucks',function(){
      console.log('changed the trucks');
      this.render();

    },this);

    this.render();
  },

  render: function(){
    var defaults = this.model.get('defaults');
    var trucks = this.model.get('trucks');


    var map = this.model.get('leaflet');

    if(!map){

      L.mapbox.accessToken = 'pk.eyJ1Ijoiam9tZXJpbm9nIiwiYSI6InNGT0tvZWsifQ.engPCXKX_6z8dmvrtlvWng';
      map = L.mapbox.map(this.$el[0],'jomerinog.l05n9la7',{zoomControl: false});
      // Provide your access token
      this.model.set('leaflet',map);
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
      var marker = L.marker(
        [truck.attributes.latitude, truck.attributes.longitude]
      );
      marker.on('mouseover',function(){
        truck.set('highlight', true);

      });
      marker.on('mouseout', function(){
        truck.set('highlight', false);
      });
      marker.setOpacity(0.5);
      truck.on('change',function(newTruck){

        if(newTruck.attributes.highlight){
          console.log('Set it to 1');
          marker.setOpacity(1);
        } else {
          console.log('Set it to 0.7');
          marker.setOpacity(0.5);
        }

      });
      marker.addTo(map);
      this.markers.push(marker);
    }.bind(this));


  }

});