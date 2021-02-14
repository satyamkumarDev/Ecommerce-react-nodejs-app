import bcrypt from 'bcryptjs';

const data={
    users:[

       {
            name:'Admin',
            email:'admin@gmail.com',
            password:bcrypt.hashSync('123456',8),
            isAdmin:true,

        },
        { 
            name:'satyam kumar',
            email:'user@gmail.com',
            password:bcrypt.hashSync('123456',8),
            isAdmin:false,

        }
    ],
products:[
{
    
    name:'Nike Slim Shirt',
    category:'Shirts',
    image:'/images/p1.jpg',
    price:99,
    countInStock:15,
    brand:'Nike',
    rating:4,
    numReviews:10,
    description:'high quality product',
},
{
 
    name:'Adidas Slim Shirt',
    category:'Shirts',
    image:'/images/p2.jpg',
    price:65,
    countInStock:0,
    brand:'Adidas',
    rating:3,
    numReviews:9,
    description:'high quality product',
},
{
   
    name:'puma Shirt',
    category:'Shirts',
    image:'/images/p3.jpg',
    price:220,
    countInStock:25,
    brand:'Nike',
    rating:5,
    numReviews:6,
    description:'high quality product',
},
{
   
    name:'Nike New Slim Pants',
    category:'Pants',
    image:'/images/p4.jpg',
    price:80,
    countInStock:20,
    brand:'Nike',
    rating:3.5,
    numReviews:10,
    description:'high quality product',
},
{
   
    name:'Puma pants',
    category:'Pants',
    image:'/images/p5.jpg',
    price:300,
    countInStock:0,
    brand:'Puma',
    rating:5,
    numReviews:10,
    description:'high quality product',
},
{
   
    name:'Adidas Slim Pants',
    category:'Pants',
    image:'/images/p6.jpg',
    price:160,
    countInStock:5,
    brand:'Adidas',
    rating:4.5,
    numReviews:10,
    description:'high quality product',
},
// {
//     _id:'7',
//     name:'Adidas pro',
//     category:'Shirts',
//     image:'/images/product-2.jpg',
//     price:99,
//     countInStock:0,
//     brand:'Adidas pro',
//     rating:4,
//     numReviews:4,
//     description:'high quality product',
// },
// {
//     _id:'8',
//     name:'Lecoste Free Shirt',
//     category:'Shirts',
//     image:'/images/product-1.jpg',
//     price:220,
//     countInStock:10,
//     brand:'Lecoste',
//     rating:4.5,
//     numReviews:3.5,
//     description:'high quality product',
// },
// {
//     _id:'9',
//     name:'Lecoste pro',
//     category:'pants',
//     image:'/images/product-2.jpg',
//     price:60,
//     countInStock:30,
//     brand:'Lecoste pro',
//     rating:2.5,
//     numReviews:2,
//     description:'high quality product',
// },
]
}

export default data;