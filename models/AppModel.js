// Root model for the app
var AppModel = Backbone.Model.extend({

  initialize: function(){
    this.set('map', new MapModel());
  }

});