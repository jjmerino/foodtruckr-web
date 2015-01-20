var NavbarView = Backbone.View.extend({
  tagName: 'div',
  className : 'container',
  events: {
    'click .search': 'search'
  },

  initialize: function(){
    // on initialize, render
    this.render();
  },
  render: function(){
    // render template into the element. No model is required at this point
    var template = _.template($('#templates_nav').html());
    this.$el.html(template);
  },
  search: function(){
    // search intention just triggers an event because of the layered architecture
    this.trigger('search');
  }
});
