import * as types from "./actionTypes";
import { firebase } from "../lib/initFirebase"
import { CONTACTS_PER_PAGE, BASE_URL } from "../lib/constants";
const db = firebase.database()


export function addContact(contact, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {
                contact.createdBy = userId;
                const response = await fetch(BASE_URL + "/contacts/", {
                    method: "POST",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(contact),
                    referrer: "no-referrer", // no-referrer, *client
                });
            }

            dispatch({ type: types.SET_LOADING, loading: false });
            if (callback) {
                callback();
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}

export function loadAllContacts(page, filters, orderBy, onlyFavourite = false) {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {

                const response = await fetch(BASE_URL + "/contacts/by-user/" + userId, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    
                    referrer: "no-referrer", // no-referrer, *client
                });
    
                let responseBody = await response.json();
                
                let contacts = responseBody.contacts
                console.log(contacts)
                let count = 0;

                if (filters.firstName || filters.lastName || filters.email || onlyFavourite) {
                    contacts = contacts.filter(c => {
                        if (filters.firstName) {
                            if (!c.firstName.toLowerCase().includes(filters.firstName.toLowerCase())) {
                                return false
                            }
                        }
                        if (filters.lastName) {
                            if (!c.lastName.toLowerCase().includes(filters.lastName.toLowerCase())) {
                                return false
                            }
                        }
                        if (filters.email) {
                            if (!c.contactType === "Email" || !c.contact.toLowerCase().includes(filters.email.toLowerCase())) {
                                return false
                            }
                        }

                        if(onlyFavourite && !c.isFavourite){
                            return false;
                        }

                        return true
                    })

                    count = contacts.length
                }

                const startIndex = (page - 1) * CONTACTS_PER_PAGE;
                const endIndex = startIndex + CONTACTS_PER_PAGE;

                contacts = contacts.filter((c, index) => {
                    if (index >= startIndex && index < endIndex) {
                        return true;
                    }
                    return false;
                }).sort((a, b) => {
                    if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) { return orderBy === "asc" ? -1 : 1; }
                    if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) { return orderBy === "asc" ? 1 : -1; }
                    return 0;
                })
                console.log(orderBy, filters, page)

                const numberOfPages = Math.ceil(count / CONTACTS_PER_PAGE)
                dispatch({ type: types.SET_ALL_CONTACTS, contacts, count: count > 0 ? numberOfPages : 0 });
            }

            dispatch({ type: types.SET_LOADING, loading: false });

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}

export function loadContactById(id) {
    return async (dispatch, getState) => {
        try {

            dispatch({ type: types.SET_LOADING, loading: true });

                const response = await fetch(BASE_URL + "/contacts/" + id, {
                    method: "GET",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    referrer: "no-referrer", // no-referrer, *client
                });
    
                let contact = await response.json();

                dispatch({ type: types.SET_CURRENT_CONTACT, contact: { ...contact, key: contact.id } });
                dispatch({ type: types.SET_LOADING, loading: false });
            

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}


export function addToFavourite(contact, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {

                const updatedContact = {
                    ...contact,
                    isFavourite: true
                }

                const response = await fetch(BASE_URL + "/contacts/", {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedContact),
                    referrer: "no-referrer", // no-referrer, *client
                });
    
                let responseBody = await response.json();
            }

            dispatch({ type: types.SET_LOADING, loading: false });
            if (callback) {
                callback();
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}

export function removeFromFavourite(contact, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {

                const updatedContact = {
                    ...contact,
                    isFavourite: false
                }

                const response = await fetch(BASE_URL + "/contacts/", {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedContact),
                    referrer: "no-referrer", // no-referrer, *client
                });
    
                let responseBody = await response.json();
            }

            dispatch({ type: types.SET_LOADING, loading: false });
            if (callback) {
                callback();
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}

export function editContact(contact, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {

                const updatedContact = {
                    ...contact
                }

                const response = await fetch(BASE_URL + "/contacts/", {
                    method: "PUT",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(updatedContact),
                    referrer: "no-referrer", // no-referrer, *client
                });
    
                let responseBody = await response.json();
            }

            dispatch({ type: types.SET_LOADING, loading: false });
            if (callback) {
                callback();
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}

export function removeContact(contact, callback) {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: types.SET_LOADING, loading: true });
            const userId = localStorage.getItem('user-key')

            if (userId) {

                const response = await fetch(BASE_URL + "/contacts/" + contact.id, {
                    method: "DELETE",
                    mode: "cors",
                    cache: "no-cache",
                    credentials: "same-origin",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    referrer: "no-referrer", // no-referrer, *client
                });
            }

            dispatch({ type: types.SET_LOADING, loading: false });

            if (callback) {
                callback();
            }

        } catch (error) {
            console.log(error)
            dispatch({ type: types.SET_LOADING, loading: false });
        }
    };
}