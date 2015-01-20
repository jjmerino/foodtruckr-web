var InfoItemView = Backbone.View.extend({
  tagName: 'li',

  className: ' list-unstyled alert',
  events: {
    'mouseover':'highlight',
    'mouseout': 'removeHighlight'

  },
  initialize: function(){
    this.render();
    this.model.on('change',function(){
      if(this.model.attributes.highlight){
        this.$el.addClass('alert-success');
      }else{
        this.$el.removeClass('alert-success');
      }
    }, this);
  },

  highlight: function(){
    this.model.set('highlight', true);
  },

  removeHighlight: function(){
    this.model.set('highlight', false);
  },

  render: function(){
    return this.$el.html(this.model.attributes.applicant);
  }
});
