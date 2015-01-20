var InfoView = Backbone.View.extend({
  tagName: 'ul',
  className : 'truckList info col-md-4',

  initialize: function(){
    this.model.on('change:trucks',function(){
      this.render();
    },this);
    this.render();
  },

  render: function(){
    this.$el.html('').append(
      this.model.get('trucks').map(function(truck){
        console.log("AHAm");
        return new InfoItemView({model: truck}).render();
      })
    );
  }
});
