var AppView = Backbone.View.extend({

  initialize: function(params){
    this.searchView = new SearchView({model: this.model.get('search')});
    this.mapView = new MapView({model: this.model.get('map')});

    this.searchView.on('search',function(){
      this.model.get('map').fetchTrucks();
    },this);
  },

  render: function(){
    return this.$el.html([
      this.searchView.$el,
      this.mapView.$el
    ]).addClass('wrapper');
  }

});