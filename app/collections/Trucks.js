var Trucks= Backbone.Collection.extend({
  // ensures that collection items get parsed to appropriate class
  model: TruckModel,

  fetch: function(bounds){

    if(!bounds){
      console.warn('Trucks can not be fetched without bounds');
      return;
    }

    var sw = bounds.getSouthWest();
    var ne = bounds.getNorthEast();
    var url = 'http://foodtruckr-server.herokuapp.com/findInRect/'+sw.lat+'/'+ sw.lng+'/'+ ne.lat+'/'+ ne.lng;

    $.ajax({
      type:'GET',
      url: url,
      dataType:'json',
      success: function(resp){
        // on success mutate the trucks property, which will trigger mapModel's change:trucks event
        this.set(resp);
        this.trigger('change');
      }.bind(this) // binding is necessary to keep 'this' bound to the view
    })
  }
});
