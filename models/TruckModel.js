var TruckModel = Backbone.Model.extend({

  // select a truck for details
  select: function(){
    this.trigger('select', this);
  },
  highlight: function(){
    this.set('highlight', true);
  },
  removeHighlight: function(){
    this.set('highlight', false);
  }
});
