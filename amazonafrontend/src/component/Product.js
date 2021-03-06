import React from 'react';
import {Link} from 'react-router-dom';
// import Rating from './Ratings'
import StarRatings from 'react-star-ratings';
export default function Product(props){
    const {product}=props;
    return(
        <div key={product._id} className="card">
           <Link to={`/product/${product._id}`}>
               <img src={product.image} alt={product.name} />
           </Link>
           <div className="card-body">
               <Link to={`/product/${product._id}`}>
                   <h2>{product.name}</h2>
               </Link>
               <StarRatings 
                            rating={product.rating}
                            numReviews={product.numReviews}
                            starDimension="30px"
                            starSpacing="10px"
                            starRatedColor="rgb(240,192,64)"
                            />
               {/* <Rating rating={product.rating} numReviews={product.numReviews}></Rating> */}
               <div className="price">
                  ${product.price}
               </div>
           </div>
       </div>
    )
}