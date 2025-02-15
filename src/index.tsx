import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { MapWebViewProps, MapMessage } from './types';

import { getMapHTML } from './map';

const MapWebView: React.FC<MapWebViewProps> = ({
  locations = [],
  centerLat,
  centerLng,
  zoomLevel = 13,
  onMarkerPress,
  style
}) => {
  const webViewRef = useRef<WebView>(null);
  
  const defaultCenter = {
    lat: centerLat ?? locations[0]?.latitude ?? 0,
    lng: centerLng ?? locations[0]?.longitude ?? 0
  };

  useEffect(() => {
    if (webViewRef.current && locations.length > 0) {
      const message: MapMessage = {
        type: 'UPDATE_LOCATIONS',
        locations,
        centerLat: defaultCenter.lat,
        centerLng: defaultCenter.lng
      };
      webViewRef.current.postMessage(JSON.stringify(message));
    }
  }, [locations, defaultCenter.lat, defaultCenter.lng]);

  const handleMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'MARKER_CLICK' && onMarkerPress) {
        onMarkerPress(data.location);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{
        html: getMapHTML(
          locations,
          defaultCenter.lat,
          defaultCenter.lng,
          zoomLevel
        )
      }}
      style={[styles.webview, style]}
      originWhitelist={['*']}
      javaScriptEnabled
      domStorageEnabled
      onMessage={handleMessage}
    />
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1
  }
});

export default MapWebView;