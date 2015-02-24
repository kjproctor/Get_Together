/** @jsx React.DOM */
var React = require('react/addons');
var ReactGoogleMaps = require('react-googlemaps');
var GoogleMapsAPI = window.google.maps;
var Map = ReactGoogleMaps.Map;
var Marker = ReactGoogleMaps.Marker;
var LatLng = GoogleMapsAPI.LatLng;
var OverlayView = ReactGoogleMaps.OverlayView;

var LocalMap = React.createClass({
  getInitialState: function() {
    return {
      center: new LatLng(-34.397, 150.644),
      zoom: 16,
      markers: [
        {position: new LatLng(-34.397, 150.644)}
      ]
    };
  },

  getDefaultProps: function()
  {
    return {
        address: ''
    }
  },

  render: function() {
    return (
      <Map
        initialZoom={this.state.zoom}
        center={this.state.center}
        onCenterChange={this.handleCenterChange}
        width={400}
        height={400}
        onClick={this.handleMapClick}>
        {this.state.markers.map(this.renderMarkers)}
      </Map>
      );
  },

  handleMarkerClick: function(event, pin) {
    console.debug("handleMarkerClick", event, pin);
    var infowindow = new GoogleMapsAPI.InfoWindow();
    infowindow.setContent("test");
    infowindow.setPosition(pin.position);
    infowindow.open(pin.map);
  },

  renderMarkers: function(state, i) {
    return (
      <Marker position={state.position} key={i} onClick={this.handleMarkerClick} />
      );
  },

  handleMapClick: function(mapEvent) {
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

  handleCenterChange: function(map) {
    this.setState({
      center: map.getCenter()
    });
  },

  componentDidMount: function()
  {
    console.debug("props", this.props);
    var geocoder = new GoogleMapsAPI.Geocoder();
    geocoder.geocode({ 'address': "Orchard Grove Community Church, Walled Lake, MI 48390" }, this.handleGeoCodeResults);
  },

  handleGeoCodeResults(results, status)
  {
    console.debug("google:", results);
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
  }

});

module.exports = LocalMap;