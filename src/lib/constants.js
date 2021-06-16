export const CONTACTS_PER_PAGE = 15;

export const BASE_URL = "http://localhost:8080/api/v1";

export const INITIAL_FILTERS = {
    firstName: '',
    lastName: '',
    email: ''
}

export const ORDER_BY_OPTIONS = [
    { key: 'asc', value: 'asc', text: 'asc' },
    { key: 'desc', value: 'desc', text: 'desc' },
]

export const INITIAL_CONTACT_VALUES = {
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    contactType: null,
    contact: ''
}

export const CONTACT_OPTIONS = [
    { key: 'null', value: null, text: '' },
    { key: 'mob', value: 'Mobile Phone', text: 'Mobile Phone' },
    { key: 'fix', value: 'Landline Phone', text: 'Landline Phone' },
    { key: 'email', value: 'Email', text: 'Email' },
    { key: 'pager', value: 'Pager', text: 'Pager' },
]