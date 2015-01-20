var InfoItemView = Backbone.View.extend({
  tagName: 'li',
  className: 'list-unstyled alert',

  //set events for highlighting trucks on hover
  events: {
    'mouseover':'highlight',
    'mouseout': 'removeHighlight',
    'click': 'select'
  },

  initialize: function(){

    // when the truck is highlighted, make css modifications
    this.model.on('change',function(){
      if(this.model.attributes.highlight){
        this.$el.addClass('alert-success');
      }else{
        this.$el.removeClass('alert-success');
      }
    }, this);

    this.render(); // on initialize, render
  },

  // highlights the truck bound to this view
  highlight: function(){
    this.model.highlight();
  },

  // removes the highlight
  removeHighlight: function(){
    this.model.removeHighlight();
  },

  // delegate to the model's select
  select: function(){
    this.model.select();


  },

  render: function(){

    // returns the rendered element to allow nesting
    return this.$el.html(this.model.attributes.applicant);
  }
});
