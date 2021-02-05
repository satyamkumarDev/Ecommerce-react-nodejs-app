// import data from './data';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { cartReducers } from './reducers/cartReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers';
import { productDetailsReducers, productListReducers } from './reducers/ProductReducers';
import { userRegisterReducer, userSigninReducer } from './reducers/userReducers';
const initialState={
    userSignin:{
        userInfo:localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')): null,
    },
    cart:{
        cartItems:localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingAddress:localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {},
        paymentMethod: 'PayPal'
    },
};
const reducer=combineReducers({
    productList:productListReducers,
    productDetailsList:productDetailsReducers,
    cart:cartReducers,
    userRegister:userRegisterReducer,
    userSignin: userSigninReducer,
    orderCreate: orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store=createStore(reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;