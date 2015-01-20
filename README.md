# FoodTruckr web client

## Introduction
This is the web client for the FoodTruckr project. This relies on a connection to a backend server, which can be found here:

TODO: Link to the backend repository.

This app does not rely on being served by the api server. 
For more information on configuring CORS access to the API visit the FoodTruckr-server README.


## Front end general architecture

* The application consists of a single page app powered by BackboneJS

* Since application size is small, files have been grouped in models, views and collections folders, instead of by domain entities (e.g: trucks folder).

* For the same reason, inline templates have been used and processed with underscore.js, and all templates are stored in index.html, requiring less http calls.

* The whole app is nested inside a root AppModel and AppView.

## Map provider and considerations

* Mapbox has been used as the map provider for it's ease of customization.

* The map api has been wrapped in the Map View, and not a model, because it requires an html tag to be available on instantiation.

* Leaflet relies on reading the size of it's element on runtime for certain operations. Since the map gets created before the view is inserted in the html, unexpected behaviour occurs when panning the map on the render function.
This was solved by queueing this manipulation in the Event Queue (using `setTimeout(...,0)` ). This ensures the map is already inserted in the HTML, and *does* have a size when Leaflet reads it.

## API considerations

* The app connects to the backend server using jQuery's $.ajax. Note that these calls were not abstracted in their own file because the small application size does not justify the increased architectural complexity. Consider doing this if the app grows.