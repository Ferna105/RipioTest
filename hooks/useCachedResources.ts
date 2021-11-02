import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const createDatabase = async () => {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      console.warn('Creating database folder');
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }

    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite/myDatabaseName.db')).exists) {
      console.warn('Creating database');
      await FileSystem.downloadAsync(
        Asset.fromModule(require("../assets/sqlite.db")).uri,
        FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
      );
    }

    console.warn('Loaded Database files');
  }


  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
        });

        await createDatabase();

      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
