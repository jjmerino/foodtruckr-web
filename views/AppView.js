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
      this.fetchTrucks(bounds);

    },this); // binding is necessary to keep 'this' bound to the view

  },

  fetchTrucks: function(bounds){

    // if bounds are not provided, don't query the server
    if(!bounds){
      console.warn('Trucks can not be fetched without bounds');
      return;
    }
    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();

    var url = 'http://localhost:8081/findInRect/'+sw.lat+'/'+ sw.lng+'/'+ ne.lat+'/'+ ne.lng;
    $.ajax({
      type:'GET',
      url: url,
      dataType:'json',
      success: function(resp){
        // on success mutate the trucks property, which will trigger mapModel's change:trucks event
        this.model.get('map').set('trucks',new Trucks(resp));


      }.bind(this) // binding is necessary to keep 'this' bound to the view
    })
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