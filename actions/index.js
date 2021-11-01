import { SIGN_IN, SIGN_OUT, SET_USER_ACCOUNT, SET_USER_ACCOUNT_HISTORY } from '../constants';

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
            if(result.rows.length >= 1){
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

export const getAccountDataByUser = (user_id) => {
  return dispatch => {
    openDatabase().then(db => {
      db.transaction(
        tx => {
          tx.executeSql('select * from accounts where user_id = ?', [user_id], (trans, result) => {
            if(result.rows.length >= 1){
              dispatch({type: SET_USER_ACCOUNT, account: result.rows._array[0]})
            } else {
              alert('El usuario no tiene cuenta de Crypto.')
            }
          });
        }
      );
    });
  }
}

export const getAccountDataHistory = (account_id) => {
  return dispatch => {
    openDatabase().then(db => {
      db.transaction(
        tx => {
          tx.executeSql('select * from accounts_history where account_from_id = ? or account_to_id = ?', [account_id, account_id], (trans, result) => {
            dispatch({type: SET_USER_ACCOUNT_HISTORY, history: result.rows._array})
          }, (error) => console.warn(error));
        }
      );
    });
  }
}

export const transfer = (from_address, to_address, amount) => {
  return dispatch => {
    openDatabase().then(db => {
      db.transaction(
        tx => {
          var currentFromBalance;

          tx.executeSql('select * from accounts where address = ?', [from_address], (trans, result) => {
            currentFromBalance = result.rows._array[0].balance;
            console.warn(currentFromBalance);
          }, (error) => console.warn(error));

          var newFromBalance = parseFloat(currentFromBalance) - parseFloat(amount);
          console.warn(currentFromBalance);
          tx.executeSql('update accounts set balance = ? where address = ?', [500,from_address], (trans, result) => {
            console.warn(currentBalance);
          }, (error) => console.warn(error));
        }
      );
    });
  }
}