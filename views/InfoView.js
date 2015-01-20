var InfoView = Backbone.View.extend({
  tagName: 'div',
  className : 'info col-md-4',

  initialize: function(){
    this.model.on('change:trucks',function(){
      this.render();
    },this);
    this.render();
  },

  render: function(){
    var template = _.template($('#templates_info').html());
    this.$el.html(template).find('.truckList').append(
      this.model.get('trucks').map(function(truck){
        return new InfoItemView({model: truck}).render();
      })
    );
  }
});
