var TruckDetailView = Backbone.View.extend({
  tagName: 'div',
  className: 'panel panel-overlayed foodDetails',

  initialize: function(){

    this.render();
  },

  // since we start with no model, delegate model and render timing to the outside world
  setTruck: function(truck){
    this.model = truck;
    this.render();
  },

  render: function(){

    if(!this.model){
      return this.$el.html('Click a truck above to view details');
    }
    // returns the rendered element to allow nesting
    this.$el.html(_.template($('#templates_detail').html())(this.model.attributes));
    this.$el.find('.foodItems').append(
      _(this.model.attributes.fooditems.split(':')).map(function(foodItem){
        return '<li>'+foodItem+'</li>';

      })
    )
  }
});
