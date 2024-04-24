import type { NextApiRequest,NextApiResponse } from "next";
import Stripe from "stripe";
import getRawBody from "raw-body";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion:"2023-10-16",
})

const endpointsecret = process.env.WEBHOOK_SECRET as string

export const config = {
    api:{
        bodyParser:false
    }
}



export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    try{
        console.log(req.headers)
        if(req.method !== 'POST'){
            return res.status(405).send('Method not allowed')
        }
            
        
        const sig:any = req.headers['stripe-signature'];
        const rawBody = await getRawBody(req);

        let event;
        try{
            event = stripe.webhooks.constructEvent(rawBody,sig,endpointsecret);
        }catch(err:any){
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }

        console.log("event.type",JSON.stringify(event.type));

        if(event.type === 'checkout.session.completed'){
            console.log("Completed")
            const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
                event.data.object.id,{
                    expand:['line_items'],
                });
                
            const lineItems = sessionWithLineItems.line_items;

            if(!lineItems){
                return res.status(500).send("Internal Server Error");
            }

            try{
                console.log("checkout completed");
                console.log("data" ,lineItems.data);

                console.log("Customer Email",(event.data.object as any).customer_details.email);
            }catch(err){
                console.log(err);
            }
        }
    }catch(err){
        console.log(err);
        res.status(500).send('Error');

    }
}