const express = require('express');
const app = express();
const cors = require('cors');
const stripe = require('stripe')('sk_test_51RR4xKErscB5RpYRZRPiD152pMMEC61dEijYCgPPaoW3KAG7UPcDjp7TRlivtEod6T6ZfFdSRX6FQMMVOM9eShQj00qaeG5hOg');

app.use(express.json());
app.use(cors());

app.post('/api/create-checkout-session', async(req,res)=>{
const {products} = req.body;
const lineItems = products.map((product)=>({
    price_data:{
        currency:'INR',
        product_data : {
            name:product.name
        },
        unit_amount:product.price * 100,
    },
    quantity:product.quantity
}));

const session = await stripe.checkout.sessions.create({
    payment_method_types:['card'],
    line_items:lineItems,
    mode:'payment',
    success_url:'http://localhost:5173/success',
    cancel_url:'http://localhost:5173/cancel',

});
res.json({id:session.id})
})
app.listen(7000,()=>{
    console.log('server start')
})