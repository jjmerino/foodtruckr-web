var AppView = Backbone.View.extend({

  initialize: function(){
    this.navbarView = new NavbarView();


    // map view watches the map model
    this.mapView = new MapView({model: this.model.get('map')});

    console.log('InfoView');
    // info view also watches the map model
    this.infoView = new InfoView({model: this.model.get('map') });

    this.navbarView.on('search',function(){
      this.fetchTrucks(
        this.model.get('map')
        .get('leaflet')
        .getBounds());
    },this);

    this.model.get('map').on('change:trucks', function(){

    });

  },

  fetchTrucks: function(bounds){
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
        this.model.get('map').set('trucks',new Trucks(resp));
      }.bind(this)
    })
  },
  render: function(){
    return this.$el.html([
      this.navbarView.$el,
      this.mapView.$el,
      this.infoView.$el
    ]).addClass('wrapper');
  }

});