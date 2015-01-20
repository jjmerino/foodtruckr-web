// Root model for the app
var AppModel = Backbone.Model.extend({
  initialize: function(){

    // wrap trucks into a map model to maintain references easily when mutating trucks.
    var mapModel = new MapModel({
      trucks: new Trucks()
    });

    // expose the map model for access from the view
    this.set('map', mapModel);
  }
});