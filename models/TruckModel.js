var TruckModel = Backbone.Model.extend({

  // select a truck for details
  select: function(){
    this.trigger('select', this);
  }
});
