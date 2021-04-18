import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, removeFromCart} from '../actions/cartActions';
import MessageBox from '../component/MessageBox';
export default function CartScreen(props){

    const productId=props.match.params.id;
    const qty=props.location.search ? Number(props.location.search.split('=')[1]):1;
    const dispatch=useDispatch();
    const cart=useSelector(state=>state.cart);
    const {cartItems}=cart;
    const checkoutHandler=()=>{
        props.history.push('/signin?redirect=shipping');
    }
    const removeFromCartHandler=(id)=>{
        //delete item
        dispatch(removeFromCart(id));
    }

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty))
        }
    }, [dispatch, productId, qty]);
    return(
        <div className="row top">
            <div className="col-2">
                <h1>Shopping Cart</h1>
                {cartItems.length ===0? <MessageBox>
                    cart is empty. <Link to="/">Go Shoppping</Link>
                </MessageBox> 
            :
            (
                <ul>
                    {
                        cartItems.map((item)=>{
                          return  <li key={item.product}>
                                <div className="row">
                                    <div>
                                        <img src={item.image} alt={item.name} className="small"></img>
                                    </div>
                                    <div className="min-30">
                                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                                    </div>
                                    
                                    <div>
                                        <select value={item.qty}
                                         onChange={(e)=>
                                            dispatch(
                                                addToCart(item.product,Number(e.target.value))
                                            )
                                            }>
                                        {[...Array(item.countInStock).keys()].map((x)=>(
                                                            <option key={x+1} value={x+1}>{x+1}</option>
                                                        ))}
                                        </select>
                                        
                                    </div>
                                    <div>
                                        ${item.price}
                                    </div>
                                    <button type="button" onClick={()=>removeFromCartHandler(item.product)}>Delete</button>


                                </div>
                            </li>
                        })
                    }
                </ul>
            )    
            }

            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                
                                Subtotal ({cartItems.reduce((a,c)=>a + c.qty, 0)} items) : $
                                {cartItems.reduce((a,c)=>a + c.price * c.qty,0)}
                            </h2>
                        </li>
                        <li>
                            <button type="button" onClick={checkoutHandler} className="primary block" disabled={cartItems.length===0}>
                                Proceed to checkout
                            </button>
                        </li>
                    </ul>


                </div>


            </div>

        </div>
        // <div>
        //     <h2>Cart Screen</h2>
        //     <p>ADD TO CART: <h2>productId</h2>:{productId}  <h2>Qty</h2>: {qty}</p>
        // </div>
    )
}