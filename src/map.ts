import { MapLocation } from "./types";

export const getMapHTML = (
    locations: MapLocation[],
    centerLat: number,
    centerLng: number,
    zoomLevel: number
  ) => `
  <!DOCTYPE html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
      <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
      <style>
        html, body, #map {
          height: 100%;
          width: 100%;
          margin: 0;
          padding: 0;
        }
      </style>
    </head>
    <body>
      <div id="map"></div>
      <script>
        const map = L.map('map').setView([${centerLat}, ${centerLng}], ${zoomLevel});
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);
  
        const locations = ${JSON.stringify(locations)};
        const markers = {};
        
        locations.forEach(location => {
          const marker = L.marker([location.latitude, location.longitude])
            .addTo(map)
            .bindPopup(\`<strong>\${location.displayName}</strong><br>\${location.address}\`);
          
          marker.on('click', () => {
            window.ReactNativeWebView.postMessage(JSON.stringify({
              type: 'MARKER_CLICK',
              location: location
            }));
          });
          
          markers[location.id] = marker;
        });
  
        window.map = map;
        window.markers = markers;
  
        window.addEventListener('message', function(event) {
          const data = JSON.parse(event.data);
          if (data.type === 'UPDATE_LOCATIONS') {
            data.locations.forEach(location => {
              if (markers[location.id]) {
                markers[location.id].setLatLng([location.latitude, location.longitude]);
              } else {
                const marker = L.marker([location.latitude, location.longitude])
                  .addTo(map)
                  .bindPopup(\`<strong>\${location.displayName}</strong><br>\${location.address}\`);
                markers[location.id] = marker;
              }
            });
            map.setView([data.centerLat, data.centerLng], map.getZoom());
          } else if (data.type === 'ZOOM') {
            map.setZoom(data.level);
          }
        });
      </script>
    </body>
  </html>
  `;