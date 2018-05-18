import axios from 'axios';

let initialState = {
    name: '',
    description: '',
    address: '',
    city: '',
    state: '',
    zip: 0,
    img: '',
    loan: 0,
    monthly: 0,
    desiredRent: 0,
    userId: 0,
    properties: []
}

const UPDATE_NAME = 'UPDATE_NAME';
const UPDATE_DESCRIPTION = 'UPDATE_DESCRIPTION';
const UPDATE_ADDRESS = 'UPDATE_ADDRESS';
const UPDATE_CITY = 'UPDATE_CITY';
const UPDATE_STATE = 'UPDATE_STATE';
const UPDATE_ZIP = 'UPDATE_ZIP';
const UPDATE_IMG = 'UPDATE_IMG';
const UPDATE_LOAN = 'UPDATE_LOAN';
const UPDATE_MONTHLY = 'UPDATE_MONTHLY';
const UPDATE_DESIREDRENT = 'UPDATE_DESIREDRENT';
const UPDATE_USERID = 'UPDATE_USERID';
const UPDATE_PROPERTIES = 'UPDATE_PROPERTIES';
const SIGN_OUT = 'SIGN_OUT';
const CANCEL_FORM = 'CANCEL_FORM';
const REMOVE_PROPERTY = 'REMOVE_PROPERTY';
const COMPLETED_FORM = 'COMPLETED_FORM';

export default function reducer(state = initialState, action) {
    console.log('reducer\'s action: ', action);
    switch (action.type) {
        case UPDATE_NAME:
            return Object.assign({}, state, { name: action.payload });

        case UPDATE_DESCRIPTION:
            return Object.assign({}, state, { description: action.payload });

        case UPDATE_ADDRESS:
            return Object.assign({}, state, { address: action.payload });

        case UPDATE_CITY:
            return Object.assign({}, state, { city: action.payload })

        case UPDATE_STATE:
            return Object.assign({}, state, { state: action.payload });

        case UPDATE_ZIP:
            return Object.assign({}, state, { zip: action.payload });

        case UPDATE_IMG:
            return Object.assign({}, state, { img: action.payload });

        case UPDATE_LOAN:
            return Object.assign({}, state, { loan: action.payload });

        case UPDATE_MONTHLY:
            return Object.assign({}, state, { monthly: action.payload });

        case UPDATE_DESIREDRENT:
            return Object.assign({}, state, { desiredRent: action.payload });

        case UPDATE_PROPERTIES + '_FULFILLED':
            return Object.assign({}, state, { properties: action.payload });

        case UPDATE_USERID:
            return Object.assign({}, state, { userId: action.payload });

        case REMOVE_PROPERTY + '_FULFILLED':
            return Object.assign({}, state, { properties: action.payload });

        case CANCEL_FORM:
            console.log('reducer before cleared: ', state)
            return Object.assign({}, state,
                {
                    name: '',
                    description: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: 0,
                    img: '',
                    loan: 0,
                    monthly: 0,
                    desiredRent: 0,
                }
            )

        case COMPLETED_FORM + '_FULFILLED':
            console.log('reducer before cleared: ', state)
            return Object.assign({}, state,
                {
                    name: '',
                    description: '',
                    address: '',
                    city: '',
                    state: '',
                    zip: 0,
                    img: '',
                    loan: 0,
                    monthly: 0,
                    desiredRent: 0,
                }
            )

        case SIGN_OUT + '_FULFILLED':
            console.log(`user signed out: ${action.payload}`);
            return Object.assign({}, state, initialState)

        default:
            return state
    }
}

export function updateName(name) {
    return {
        type: UPDATE_NAME,
        payload: name
    }
}

export function updateDescription(desc) {
    return {
        type: UPDATE_DESCRIPTION,
        payload: desc
    }
}

export function updateAddress(address) {
    return {
        type: UPDATE_ADDRESS,
        payload: address
    }
}

export function updateCity(city) {
    return {
        type: UPDATE_CITY,
        payload: city
    }
}

export function updateState(state) {
    return {
        type: UPDATE_STATE,
        payload: state
    }
}

export function updateZip(zip) {
    return {
        type: UPDATE_ZIP,
        payload: zip
    }
}

export function updateImg(img) {
    return {
        type: UPDATE_IMG,
        payload: img
    }
}

export function updateLoan(loan) {
    return {
        type: UPDATE_IMG,
        payload: loan
    }
}

export function updateMonthly(monthly) {
    return {
        type: UPDATE_MONTHLY,
        payload: monthly
    }
}

export function updateDesiredRent(rent) {
    return {
        type: UPDATE_DESIREDRENT,
        payload: rent
    }
}

export function updateUserId(id) {
    return {
        type: UPDATE_USERID,
        payload: id
    }
}

export function getProperties() {
    let properties = axios.get(`/api/properties`).then(response => {
        return response.data
    }).catch(err => console.log(err));
    return {
        type: UPDATE_PROPERTIES,
        payload: properties
    }
}

export function getPropertiesByRent(rent){
    let properties = axios.get(`/api/properties?desiredrent=${rent}`).then(response =>{
        return response.data
    }).catch(err => console.log(err));

    return{
        type: UPDATE_PROPERTIES,
        payload: properties
    }
}

export function signout(history) {
    return {
        type: SIGN_OUT,
        payload: axios.post(`/api/auth/logout`).then(res => {
            console.log(`logged out`, res)
        }).catch(err => console.log(err))
    }
}

export function cancel() {
    return {
        type: CANCEL_FORM,
        payload: initialState
    }
}

export function removeProperty(id) {
    let toDisplay = axios.delete(`/api/properties/${id}`).then(response => {
        return response.data
    }).catch(err => console.log(err));

    return {
        type: REMOVE_PROPERTY,
        payload: toDisplay
    }
}


export function complete(property) {
    console.log('property object: ', property)
    axios.post(`/api/properties`, property).then(res => {
        console.log(res);
    }).catch(err => console.log(err))

    return {
        type: COMPLETED_FORM,
        payload: initialState
    }
}