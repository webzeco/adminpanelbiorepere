import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class Map extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        style={{ height: '60vh', width: '60%', background: 'white' }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            // key: 'AIzaSyACHeIb61EhRpm60etA2Ha937ZJRw7k_eM',
            key: 'AIzaSyAkYjQsd1T4Ux9LonO5qhg5jBdN1FfafH0',
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default Map;
