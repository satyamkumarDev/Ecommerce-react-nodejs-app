// import data from './data';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducers } from './reducers/cartReducers';
import { productDetailsReducers, productListReducers } from './reducers/ProductReducers';
const initialState={
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    },
};
const reducer=combineReducers({
    productList:productListReducers,
    productDetailsList:productDetailsReducers,
    cart:cartReducers,
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;