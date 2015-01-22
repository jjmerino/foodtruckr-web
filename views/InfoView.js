var InfoView = Backbone.View.extend({
  tagName: 'div',
  className : 'info col-sm-4',

  initialize: function(){

    this.truckDetailView = new TruckDetailView();

    // when the truck property of the map model changes, re render
    this.model.on('change:trucks',function(){
      this.model.get('trucks').on('select',function(model){
        this.truckDetailView.setTruck(model);
      },this);
      this.render();
    }, this);

    this.render(); // on initialize, render
  },

  render: function(){
    var template = _.template($('#templates_info').html());

    // append the inner views to the nested .trucklist element using a functional approach
    this.$el.html(template).find('.truckList').append(

      // map the collection of trucks into an array of view $elements
      this.model.get('trucks').map(function(truck){

        // return the view $el for a single truck
        return new InfoItemView({model: truck}).render();
      })
    );

    this.$el.append(this.truckDetailView.$el);
  }
});
