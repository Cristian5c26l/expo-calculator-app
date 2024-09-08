import { View, Text, Platform } from 'react-native';

import { useFonts } from 'expo-font'
import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar';

import { globalStyles } from '@/styles/global-styles';

import * as NavigationBar from 'expo-navigation-bar';

const isAndroid = Platform.OS === 'android';

if (isAndroid) {
  NavigationBar.setBackgroundColorAsync('black');
}


const RootLayout = () => {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {// Si la fuente SpaceMono no está cargada y no está lista para usar
    return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: 60 }}>Fonts not loaded!!!!!</Text>
    </View>)
  }

  return (
    <View
      style={globalStyles.background}>

      <Slot />

      <StatusBar style='light' />
    </View>
  )
}

export default RootLayout