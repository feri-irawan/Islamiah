import {useEffect} from 'react'

export default function GoogleMapTraker() {
  return (
    <>
      <div className="w-full h-96" id="googleMapTracker"></div>

      <script src="https://polyfill.io/v3/polyfill.min.js?features=default" />
      <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC0LmU81faX1ib1pV391OjdHX8RZG7xwPs&callback=initMap&v=weekly"
        async={true}
      />

      <script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
      function initMap() {
        const myLatlng = { lat: -25.363, lng: 131.044 };
        const map = new google.maps.Map(document.getElementById("googleMapTracker"), {
          zoom: 4,
          center: myLatlng,
        });
        // Create the initial InfoWindow.
        let infoWindow = new google.maps.InfoWindow({
          content: "Click the map to get Lat/Lng!",
          position: myLatlng,
        });
      
        infoWindow.open(map);
        // Configure the click listener.
        map.addListener("click", (mapsMouseEvent) => {
          // Close the current InfoWindow.
          infoWindow.close();
          // Create a new InfoWindow.
          infoWindow = new google.maps.InfoWindow({
            position: mapsMouseEvent.latLng,
          });
          infoWindow.setContent(
            JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
          );
          infoWindow.open(map);
        });
      }
      
      initMap()
      `,
        }}
      />
    </>
  )
}
