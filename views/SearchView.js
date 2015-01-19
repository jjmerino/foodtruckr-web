var SearchView = Backbone.View.extend({

  tagName: "div",

  events: {
    'click .search': 'search'
  },
  initialize: function() {
    this.render();
  },

  render: function(){
    var button = $('<button class="search">Search around here</button>');
    this.$el.html(button);
  },

  search: function(){
    this.trigger('search');
  }

});
