var MapView = Backbone.View.extend({

  tagName: "div",
  className: "map",

  initialize: function() {
    // Loading the google maps API asynchronously
    window.initializeMaps = function() {
      this.render();
    }.bind(this);
    window.onload = function(){
      var script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'key=AIzaSyANdjSOYnr9S6r9MThvG7oDCHdb4SXfRY0&' +
      'callback=initializeMaps';
      document.body.appendChild(script);
    };

    this.model.on('change:trucks',function(){
      this.render();

    },this);

  },

  render: function(){
    var defaults = this.model.get('defaults');
    var zoom = defaults.zoom;
    var center = defaults.center;
    var trucks = this.model.get('trucks');
    var latlng = new google.maps.LatLng(center[0], center[1]);

    var mapOptions = {
        zoom: zoom,
        center: latlng
      };

    var map = this.model.get('map');
    if(map === undefined){
      throw "Map model not set";
    }
    if(map === null){
      map = new google.maps.Map(this.$el[0],
        mapOptions);
      this.model.set('map',map);
    }

    // keep track of drawn markers.
    this.markers = this.markers || [];

    // clear markers from map
    _.each(this.markers, function(marker){
      marker.setMap(null);
    });

    // remove markers from array
    this.markers = [];

    trucks.each(function(truck, index){
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(truck.attributes.latitude, truck.attributes.longitude),
        map: map,
        title: truck.attributes.applicant,
        description: truck.attributes.applicant
      });
      this.markers.push(marker);
    }.bind(this));


  }

});