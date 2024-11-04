import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';

const MapScreen = () => {
  const route = useRoute();
  const { height, width } = useWindowDimensions();

  const { latitude, longitude } = route.params.location;

  return (
    <View style={styles.container}>
      <MapView
        style={{ height, width }}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType="standard"
        cameraZoomRange={{
          minZoomLevel: 15,
          maxZoomLevel: 20,
        }}
        onMapReady={() => console.log('Map is ready')}
        onRegionChange={() => console.log('Region change')}
      >
        <Marker
          title="I am here"
          coordinate={{
            latitude,
            longitude,
          }}
          description="Hello"
        />
      </MapView>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
