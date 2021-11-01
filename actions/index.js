import { SIGN_IN, SIGN_OUT } from '../constants';

import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

export const openDatabase = async () => {
    if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
      await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
    }
    await FileSystem.downloadAsync(
      Asset.fromModule(require("../assets/sqlite.db")).uri,
      FileSystem.documentDirectory + 'SQLite/myDatabaseName.db'
    );
    return SQLite.openDatabase('myDatabaseName.db');
}



export const signIn = (username, password) => {
  return dispatch => {
    openDatabase().then(db => {
      db.transaction(
        tx => {
          tx.executeSql('select * from users where username = ? and password = ?', [username,password], (trans, result) => {
            if(result.rows.length == 1){
              dispatch({type: SIGN_IN, user: result.rows._array[0]})
            } else {
              alert('Usuario y/o contraseña incorrectos.')
            }
          });
        }
      );
    });
  }

}

export const signOut = () => {
  return {type: SIGN_OUT}
}