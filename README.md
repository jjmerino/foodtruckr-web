# FoodTruckr web client

## Introduction
This is the web client for the FoodTruckr project. ***IMPORTANT*** This readme describes only the Front end considerations. 
For the general descrition of the FoodTruckr service and the Back end considerations, see the [Foodtruckr-Server Readme](https://github.com/jjmerino/foodtruckr-server) 


## Front end general architecture

* The application consists of a single page app powered by BackboneJS

* Since application size is small, files have been grouped in models, views and collections folders, instead of by domain entities (e.g: trucks folder).
Folder structure:
```
|-app/
   |-collections/
   |-models/
   |-views/
|-css/
|-index.html
```

* For the same reason, inline templates have been used and processed with underscore.js, and all templates are stored in index.html, requiring less http calls.

* The whole app is nested inside a root AppModel and AppView.



### Model and View Hierarchy guidelines

* Models and Views are nested forming a tree, starting with the App Model and View as the root. Leafs cannot access their parents as is usual in layered architectures and must rely on events.

* One model may be shared by multiple views.

* Because of how references vs value passing works in javascript, in cases where sharing a model is necessary, the mutable part of the model is wrapped in properties. This mantains references intact across the tree.
    * One such example is the trucks collection, which is wrapped on a MapModel instead of being passed directly to a view. Both MapView and InfoView share this model, but only the App mutates it. Only the truck property is mutated, which mantains the model reference intact.

### About the generic Backbone Models/Views
I have decided not to use the generic Backbone Models and Views and extend them even when no extra functionality was needed. 
I chose to do this to keep a semantic file structure (every component has a name and it's place) and easy to extend. 

### About classes in view's JS files.
I have decided to set default classes for some html tags inside the backbone config object (using className: '....') instead of using the templates. 
I chose to do this to avoid the unnecessary nesting of html tags and to avoid the extra complexity of replacing the $el which is the other workaround.

### About 1 liner templates in JS files.
In cases where the template would be simple enough to be written in a single line javascript expression, I have chosen not to use inline templates but rather string literals.

## Map provider and considerations

* Mapbox has been used as the map provider for it's ease of customization.

* The map api has been wrapped in the Map View, and not a model, because it requires an html tag to be available on instantiation.

* Leaflet relies on reading the size of it's element on runtime for certain operations. Since the map gets created before the view is inserted in the html, unexpected behaviour occurs when panning the map on the render function.
This was solved by queueing this manipulation in the Event Queue (using `setTimeout(...,0)` ). This ensures the map is already inserted in the HTML, and *does* have a size when Leaflet reads it.

## API considerations

* The app connects to the backend server using jQuery's $.ajax. Note that these calls were not abstracted in their own file because the small application size does not justify the increased architectural complexity. Consider doing this if the app grows.

## Building the app with grunt

* Grunt has been used to automate the build process by running `grunt build`. This will concat and minify all js and css assets, and generate a self contained Single Page App in the dist folder.
