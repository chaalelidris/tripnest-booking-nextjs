import stripe from "stripe";
import { SafeUser } from "@/types";

const client = new stripe(`${process.env.STRIPE_SECRET_KEY}`, {
    apiVersion: "2022-11-15",
});

export const Stripe = {
    connect: async (currentUser: SafeUser) => {
        // const response = await client.oauth.token({
        //     grant_type: "authorization_code",
        //     code,
        // });

        const nameArray = currentUser.name!.split(" ");
        const first_name = nameArray[0];
        const last_name = nameArray.length > 1 ? nameArray.slice(1).join(" ") : "";
        const url = `https://www.${currentUser.name!.replace(/\s+/g, "-").toLowerCase()}.com`;


        const accountParams = await client.accounts.create({
            type: 'express',
            email: currentUser.email!,
            business_type: 'individual',
            country: 'FR',

            capabilities: {
                card_payments: {
                    requested: true
                },
                transfers: {
                    requested: true
                }
            },
            business_profile: {
                url,
            },
            individual: {
                first_name,
                last_name,
                email: currentUser.email!, // Set the email
                /* ssn_last_4: '1234',
                dob: {
                    day: 1,
                    month: 2,
                    year: 1980
                },
                address: {
                    line1: '123 Main St',
                    city: 'Anytown',
                    state: 'CA',
                    postal_code: '12345',
                },
                phone: '8133388986', 

                business_profile: {
                    mcc: '5734', // Test industry code for computer software
                  },
                  tos_acceptance: {
                    date: Math.floor(Date.now() / 1000),
                    ip: '127.0.0.1',
                  },*/


            }
        })

        const accountId = accountParams.id
        const isProd = process.env.NODE_ENV === 'production';
        const refresh_url = isProd ? 'tripnest-idrischaalel.vercel.app' : 'http://localhost:3000/dashboard';
        const return_url = isProd ? 'tripnest-idrischaalel.vercel.app' : 'http://localhost:3000/dashboard';

        /* Create an account link for the user's Stripe account */
        const accountLink = await client.accountLinks.create({
            account: accountId,
            refresh_url,
            return_url,
            type: 'account_onboarding',
        });
        accountLink.url
        return { accountId, accountLink };
    },
    balance: async (stripeAccount: string,) => {
        const balance = await client.balance.retrieve({
            stripeAccount
        });

        return balance.available[0].amount

    },
    disconnect: async (stripeUserId: string) => {
        const response = await client.accounts.del(stripeUserId)

        return response
    },
    charge: async (amount: number, source: string, stripeAccount: string) => {
        try {
            // const res = await client.paymentIntents.create(
            //     {
            //         amount, // Amount intended to be collected (in the smallest currency unit, $1.00 => 100)
            //         currency: "usd",
            //         payment_method: source, // Payment source to be charged (tenant)
            //         application_fee_amount: Math.round(amount * 0.05), // 5% app fee (rounded to the nearest integer)
            //     },
            //     {
            //         stripeAccount: stripeAccount, // Account that is going to receive the payment (host)
            //     }
            // );
            const paymentMethod = await client.paymentMethods.create({
                type: 'card',
                card: {
                    token: source,
                },
            });
            const totalPrice = amount * 100;
            const paymentIntent = await client.paymentIntents.create({
                amount: totalPrice,
                currency: 'usd',
                payment_method: paymentMethod.id,
                payment_method_types: ['card'],
                application_fee_amount: Math.round(amount * 0.05), // 5% platform fee
                transfer_data: {
                    destination: stripeAccount,
                },
                confirm: true,
                error_on_requires_action: true,
            });

            if (paymentIntent.status !== 'succeeded') {
                throw new Error("failed to create charge with Stripe");
            }

            return paymentIntent.client_secret
        } catch (error) {
            throw new Error(error as string);
        }
    },
};
