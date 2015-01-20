// Root model for the app
var AppModel = Backbone.Model.extend({
  initialize: function(){
    var trucks = new Trucks();
    var mapModel = new MapModel({
      trucks: trucks
    });
    this.set('map', mapModel);
  }
});