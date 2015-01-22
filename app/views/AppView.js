var AppView = Backbone.View.extend({

  className: 'wrapper',

  initialize: function(){

    // Instantiate child views

    // both map and info views watches the map model, which contains the truck property
    this.mapView = new MapView({model: this.model.get('map')});
    this.infoView = new InfoView({model: this.model.get('map') });
    this.navbarView = new NavbarView();

    // navbarView triggers search when the user want's to query the api for trucks
    this.navbarView.on('search',function(){

      // get bounds from the map model's leaflet instance
      var bounds =
        this.model.get('map')
          .get('leaflet')
          .getBounds();

      // fetch trucks from API using this bounds
      this.model.get('map').fetchTrucks(bounds);

    },this); // binding is necessary to keep 'this' bound to the view

  },


  render: function(){
    // insert child views into our element
    return this.$el.html([
      this.navbarView.$el,
      this.mapView.$el,
      this.infoView.$el
    ]);
  }

});