import { SIGN_IN, SIGN_OUT, SET_USER_ACCOUNT, SET_USER_ACCOUNT_HISTORY, SET_ARS_COTIZATIONS } from '../constants';
import { Alert} from 'react-native';

import * as SQLite from 'expo-sqlite';

export const openDatabase = () => {
  return SQLite.openDatabase('myDatabaseName.db');
}

export const signIn = (username, password) => {
  return dispatch => {
    const db = openDatabase();
    db.transaction(
      tx => {
        tx.executeSql('select * from users where username = ? and password = ?', [username, password], (trans, result) => {
          if (result.rows.length >= 1) {
            dispatch({ type: SIGN_IN, user: result.rows._array[0] })
          } else {
            Alert.alert('Error','Usuario y/o contraseña incorrectos.')
          }
        }, (_,error) => console.warn(error));
      }, (errorCalback => console.warn(errorCalback))
    );
  }

}

export const signOut = () => {
  return { type: SIGN_OUT }
}

export const getAccountDataByUser = (user_id) => {
  return dispatch => {
    const db = openDatabase();
    db.transaction(
      tx => {
        tx.executeSql('select * from accounts where user_id = ?', [user_id], (trans, result) => {
          if (result.rows.length >= 1) {
            dispatch({ type: SET_USER_ACCOUNT, account: result.rows._array[0] })
          } else {
            alert('El usuario no tiene cuenta de Crypto.')
          }
        });
      }
    );
  }
}

export const getAccountDataHistory = (account_id) => {
  return dispatch => {
    const db = openDatabase();
    db.transaction(
      tx => {
        tx.executeSql(`
          SELECT ah.history_id, ah.created_datetime, ah.amount, af.address as from_address, at.address as to_address, ah.status, ah.fee
          FROM accounts_history ah 
          INNER JOIN accounts af on ah.account_from_id = af.account_id
          INNER JOIN accounts at on ah.account_to_id = at.account_id
          WHERE ah.account_from_id = ? or ah.account_to_id = ? order by 1 desc`, [account_id, account_id], (trans, result) => {
          dispatch({ type: SET_USER_ACCOUNT_HISTORY, history: result.rows._array })
        }, (error) => console.warn(error));
      }
    );
  }
}

export const transfer = (from_address, to_address, amount, fee) => {
  return dispatch => {
    const db = openDatabase();
    db.transaction(
      async (tx) => {
        //Obtengo cuenta origen
        const fromAccount = await new Promise((resolve, reject) => db.transaction(tx => {
          tx.executeSql(
            "select * from accounts where address = ?", 
            [from_address], 
            (_, { rows }) => resolve(rows._array[0]), 
            reject
            )
          }))

        //Obtengo cuenta destino
        const toAccount = await new Promise((resolve, reject) => db.transaction(tx => {
          tx.executeSql(
            "select * from accounts where address = ?", 
            [to_address], 
            (_, { rows }) => resolve(rows._array[0]), 
            reject
          )
        }))

        if (!toAccount) {
          Alert.alert('Error', 'La cuenta de destino no existe.')
        } else {

          var totalAmount = parseFloat(amount) + parseFloat(fee);
          var newFromBalance = parseFloat(fromAccount.balance) - totalAmount;
          var newToBalance = parseFloat(toAccount.balance) + parseFloat(amount);
          var datetime = (new Date()).toString();

          //Actualizo balance de cuenta origen
          const updatedFromAccount = await new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(
              'update accounts set balance = ? where account_id = ?', 
              [newFromBalance, fromAccount.account_id], 
              (_, {rowsAffected}) => resolve(rowsAffected),
              reject
            )
          }))

          //Actualizo balance de cuenta origen
          const updatedToAccount = await new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(
              'update accounts set balance = ? where account_id = ?', 
              [newToBalance, toAccount.account_id], 
              (_, { rowsAffected }) => resolve(rowsAffected),
              reject
            )
          }))

          const insertedHistory = await new Promise((resolve, reject) => db.transaction(tx => {
            tx.executeSql(
              'insert into accounts_history (history_id,account_from_id,account_to_id,created_datetime,amount,status,fee) values (?, ?, ?, ?, ?, ?, ?)', 
              [null, fromAccount.account_id, toAccount.account_id, datetime, parseFloat(amount), 'SUCCESS', parseFloat(fee)], 
              (_, { rows }) => resolve(rows._array[0]), 
              reject
            )
          }));
          Alert.alert('Éxito', 'El envío fue realizado con éxito.')

          dispatch(getAccountDataByUser(fromAccount.user_id));
          dispatch(getAccountDataHistory(fromAccount.account_id));
        }
      }
    );
  }
}

export const getCotizations = () => {
  return dispatch => {
    fetch("https://ripio.com/api/v1/rates/")
      .then(jsonResponse => jsonResponse.json())
      .then(response => dispatch({ type: SET_ARS_COTIZATIONS, sell: response.rates.ARS_SELL, buy: response.rates.ARS_BUY }));
  }
}