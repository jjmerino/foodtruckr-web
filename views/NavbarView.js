var NavbarView = Backbone.View.extend({
  tagName: 'div',
  className : 'container',
  events: {
    'click .search': 'search'
  },

  initialize: function(){
    this.render();
  },
  render: function(){

    var template = _.template($('#templates_nav').html(),{});
    this.$el.html(template);

  },
  search: function(){
    this.trigger('search');
  }
});
