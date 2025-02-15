export interface MapLocation {
    id: number;
    latitude: number;
    longitude: number;
    displayName: string;
    address: string;
  }
  
  export interface MapWebViewProps {
    locations: MapLocation[];
    centerLat?: number;
    centerLng?: number;
    zoomLevel?: number;
    onMarkerPress?: (location: MapLocation) => void;
    style?: object;
  }
  
  export interface MapMessage {
    type: 'UPDATE_LOCATIONS' | 'ZOOM';
    locations?: MapLocation[];
    centerLat?: number;
    centerLng?: number;
    level?: number;
  }
  