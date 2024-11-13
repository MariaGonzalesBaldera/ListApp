module.exports = {
  dependencies: {
    'react-native-maps': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-maps/lib/android',
        },
        ios: null, // ios dependencies are handled by CocoaPods
      },
    },
    '@invertase/react-native-apple-authentication': {
      platforms: {
        android: null
      }
    },
    'react-native-apple-authentication':{
      platforms: {
        android: null
      }
    }
  },
  project: {
    android: {
      
      unstable_reactLegacyComponentNames: [
        'AIRMap',
        'AIRMapCallout',
        'AIRMapCalloutSubview',
        'AIRMapCircle',
        'AIRMapHeatmap',
        'AIRMapLocalTile',
        'AIRMapMarker',
        'AIRMapOverlay',
        'AIRMapPolygon',
        'AIRMapPolyline',
        'AIRMapUrlTile',
        'AIRMapWMSTile',
      ],
    },
    ios: {
      unstable_reactLegacyComponentNames: [
        'AIRMap',
        'AIRMapCallout',
        'AIRMapCalloutSubview',
        'AIRMapCircle',
        'AIRMapHeatmap',
        'AIRMapLocalTile',
        'AIRMapOverlay',
        'AIRMapPolygon',
        'AIRMapPolyline',
        'AIRMapUrlTile',
        'AIRMapWMSTile',
      ],
    },
  },
  assets: ['./src/Assets/fonts'],
};