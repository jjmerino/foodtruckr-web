var AppView = Backbone.View.extend({

  initialize: function(params){
    this.navbarView = new NavbarView();
    this.mapView = new MapView({model: this.model.get('map')});

    this.navbarView.on('search',function(){
      this.model.get('map').fetchTrucks();
    },this);
  },

  render: function(){
    return this.$el.html([
      this.navbarView.$el,
      this.mapView.$el
    ]).addClass('wrapper');
  }

});