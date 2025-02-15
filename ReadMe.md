React Native Map WebView

A React Native component that renders an interactive map interface using WebView technology. This component allows you to display maps with custom markers, handle location interactions, and customize the map appearance.

Installation

# Using npm

npm install react-native-map-webview

# or using yarn

yarn add react-native-map-webview

# Basic Usage

import MapWebView from 'react-native-map-webview';

# Simple implementation with a single location:

<MapWebView
locations={[
{
latitude: selectedLocation?.latitude,
longitude: selectedLocation?.longitude,
displayName: selectedLocation?.name,
address: '',
},
]}
centerLat={selectedLocation.latitude}
centerLng={selectedLocation.longitude}
zoomLevel={13}
onMarkerPress={handleMarkerPress}
style={{flex: 1}}
/>

# Complete Example

import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapWebView from 'react-native-map-webview';

const MapScreen = () => {
const locations = [
{
id: 1,
latitude: 51.505,
longitude: -0.09,
displayName: "London",
address: "London, UK"
},
{
id: 2,
latitude: 51.51,
longitude: -0.1,
displayName: "Central London",
address: "Central London, UK"
}
];

const handleMarkerPress = (location) => {
console.log('Marker pressed:', location);
// Handle marker press event
};

return (
<View style={styles.container}>
<MapWebView
        locations={locations}
        centerLat={51.505}
        centerLng={-0.09}
        zoomLevel={13}
        onMarkerPress={handleMarkerPress}
        style={styles.map}
      />
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
},
map: {
height: 400,
width: '100%',
},
});

export default MapScreen;

# Requirements

React Native >= 0.64.0
react-native-webview (peer dependency)

# Platform Support

iOS: 11.0 and above
Android: API 21 (Android 5.0) and above

# Troubleshooting

Common issues and solutions:

Map not displaying:

Ensure proper installation of dependencies
Check internet connectivity
Verify proper API keys if required

Markers not showing:

Verify location data format
Check if coordinates are valid

# Contributing

We welcome contributions! Please see our contributing guidelines for details.
License
MIT License - see LICENSE file for details
