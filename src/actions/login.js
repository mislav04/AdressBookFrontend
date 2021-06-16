import * as types from "./actionTypes";
import { firebase } from "../lib/initFirebase"
import {BASE_URL} from "../lib/constants";
const db = firebase.database()

export function loginUser(email, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });

            const response = await fetch(BASE_URL + "/users/by-email/" + email, {
                method: "GET",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                headers:{
                    "Content-Type": "application/json",
                },
                referrer: "no-referrer", // no-referrer, *client
            });
            
            const responseBody = await response.json();
            console.log(responseBody)

            localStorage.setItem('user-key', responseBody.id)

            dispatch({ type: types.SET_LOADING, loading: false });
            
            if(callback){
                callback()
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}