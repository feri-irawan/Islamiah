import {useEffect} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps'

function Map() {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{lat: -5.432785335037951, lng: 120.20395726642634}}
    />
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default function GoogleMapTraker() {
  return (
    <>
      <div style={{width: '100%', height: '100%'}}>
        <WrappedMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDcwGyRxRbcNGWOFQVT87A1mkxEOfm8t0w"
          loadingElement={<div style={{height: `100%`}} />}
          containerElement={<div style={{height: `400px`}} />}
          mapElement={<div style={{height: `100%`}} />}
        />
      </div>

      {/* <div id="googleMapTraker"></div>

      <script src="https://polyfill.io/v3/polyfill.min.js?features=default"></script>
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDcwGyRxRbcNGWOFQVT87A1mkxEOfm8t0w&callback=initMap&v=weekly"
        async
      ></script> */}
    </>
  )
}
