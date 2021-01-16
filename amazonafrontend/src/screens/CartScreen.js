import React, { useEffect } from 'react';
import {useDispatch} from 'react-redux';
import {addToCart} from '../actions/cartActions';
export default function CartScreen(props){

    const productId=props.match.params.id;
    const qty=props.location.search? Number(props.location.search.split('=')[1]):1;
    const dispatch=useDispatch();
    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);
    return(
        <div>
            <h2>Cart Screen</h2>
            <p>ADD TO CART: <h2>productId</h2>:{productId}  <h2>Qty</h2>: {qty}</p>
        </div>
    )
}