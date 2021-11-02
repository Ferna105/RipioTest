import { SIGN_IN, SIGN_OUT, SET_USER_ACCOUNT, SET_USER_ACCOUNT_HISTORY, SET_ARS_COTIZATIONS } from '../constants';

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
            alert('Usuario y/o contraseña incorrectos.')
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
  console.warn(account_id);
  return dispatch => {
    const db = openDatabase();
    db.transaction(
      tx => {
        tx.executeSql(`
          SELECT ah.history_id, ah.created_datetime, ah.amount, af.address as from_address, at.address as to_address, ah.status
          FROM accounts_history ah 
          INNER JOIN accounts af on ah.account_from_id = af.account_id
          INNER JOIN accounts at on ah.account_to_id = at.account_id
          WHERE ah.account_from_id = ? or ah.account_to_id = ?`, [account_id, account_id], (trans, result) => {
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
      tx => {
        var currentFromBalance;

        tx.executeSql('select * from accounts where address = ?', [from_address], (trans, result) => {
          currentFromBalance = result.rows._array[0].balance;
          var totalAmount = parseFloat(amount) + parseFloat(fee);
          var newFromBalance = parseFloat(currentFromBalance) - totalAmount;
          var datetime = (new Date()).toString();

          tx.executeSql('update accounts set balance = ? where address = ?', [newFromBalance, from_address], (trans, result) => {
            console.warn(result);
          }, (_, error) => console.warn(error));

          tx.executeSql('insert into accounts_history values (?, ?, ?, ?, ?, ?)', [null, from_address, to_address, datetime, totalAmount, 'SUCCESS'], (trans, result) => {
            console.warn(result);
          }, (_, error) => console.warn(error));

        }, (error) => console.warn(error));

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