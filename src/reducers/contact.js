import { combineReducers } from "redux";
import * as types from "../actions/actionTypes";

const allContacts = (state = [], action) => {
    switch (action.type) {
        case types.SET_ALL_CONTACTS:
            return action.contacts;
        default:
            return state;
    }
};

const contactsCount = (state = 0, action) => {
    switch (action.type) {
        case types.SET_ALL_CONTACTS:
            return action.count;
        default:
            return state;
    }
};

const currentContact = (state = {}, action) => {
    switch (action.type) {
        case types.SET_CURRENT_CONTACT:
            return action.contact;
        default:
            return state;
    }
};

export default combineReducers({
    allContacts,
    contactsCount,
    currentContact
});