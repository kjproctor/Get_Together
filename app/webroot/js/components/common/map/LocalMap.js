/** @jsx React.DOM */
var React = require('react/addons');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;

var LocalMap = React.createClass({
  getInitialState: function()
  {
    return {
      center: new LatLng(-83.488311, 42.533781),
      zoom: 16,
      markers: [
        {position: new LatLng(-83.488311, 42.533781)}
      ],
      windowWidth: window.innerWidth
    };
  },

  getDefaultProps: function()
  {
    return {
        location: {}
    }
  },

  handleResize: function(e)
  {
      this.setState({windowWidth: window.innerWidth});
  },

  render: function()
  {
    return (
      <Map
        initialZoom={this.state.zoom}
        center={this.state.center}
        onCenterChange={this.handleCenterChange}
        width={this.state.windowWidth-50}
        height={400}
        onClick={this.handleMapClick}>
        {this.state.markers.map(this.renderMarkers)}
      </Map>
      );
  },

  handleMarkerClick: function(event, pin)
  {
    //console.debug("handleMarkerClick", event, pin);
    var infoWindow = new GoogleMapsAPI.InfoWindow();
    infoWindow.setContent(this.getInfoWindowContent());
    infoWindow.setPosition(pin.position);
    infoWindow.open(pin.map);
  },

  renderMarkers: function(state, i)
  {
    return (
      <Marker position={state.position} key={i} onClick={this.handleMarkerClick} />
      );
  },

  handleMapClick: function(mapEvent)
  {
    var marker = {
      position: mapEvent.latLng
    };

    var markers = React.addons
      .update(this.state.markers, {$push: [marker]});

    this.setState({
      markers: markers,
      center: mapEvent.latLng
    });
  },

  handleCenterChange: function(map)
  {
    this.setState({
      center: map.getCenter()
    });
  },

  componentDidMount: function()
  {
    window.addEventListener('resize', this.handleResize);
    var geocoder = new GoogleMapsAPI.Geocoder();
    geocoder.geocode({ 'address': this.getAddress(this.props.location) }, this.handleGeoCodeResults);
  },

  componentWillUnmount: function()
  {
      window.removeEventListener('resize', this.handleResize);
  },

  handleGeoCodeResults: function(results, status)
  {
    //console.debug("google:", results);
    if (status == google.maps.GeocoderStatus.OK)
    {
        console.debug("state:", this.state);
        this.setState({
                   center: new LatLng(results[0].geometry.location.k, results[0].geometry.location.D),
                   zoom: 16,
                   markers: [
                             {position: new LatLng(results[0].geometry.location.k, results[0].geometry.location.D)}
                            ]
                  });
    }
  },

  getAddress: function(location)
  {
    //this is an ugly hack but google geocode puts the church in the pond across the street
    if(location.name.indexOf("Orchard Grove") > -1)
    {
        return location.name+", "+location.city+", "+location.state+" "+location.zip
    }
    else
    {
        return location.street+", "+location.city+", "+location.state+" "+location.zip
    }
  },

  getInfoWindowContent: function()
  {
    var location = this.props.location;
    var content = location.name+"<br />"+
    location.description+"<br />"+
    location.street+"<br />"+
    location.city+", "+location.state+" "+location.zip+"<br />"+
    "<a href=\"https://www.google.com/maps?q="+this.getAddress(location)+"\" target=_BLANK>Get Directions</a>";
    return content;
  }
});

module.exports = LocalMap;