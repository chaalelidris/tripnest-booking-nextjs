import { NextResponse } from "next/server";

import getCurrentUser from "@/app/functions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { Stripe } from "@/libs/stripe";

export async function POST(request: Request) {
    try {
        /* const { code } = await request.json(); */

        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: `User unavailable` }, { status: 500 });
        }

        const { accountId, accountLink } = await Stripe.connect(currentUser)


        if (!accountId || !accountLink) {
            throw new Error("stripe grant error");
        }

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                walletId: accountId
            }
        })

        return NextResponse.json(accountLink.url)
    } catch (error: any) {
        throw new Error("Oops! Something went wrong");
    }


}
/* export async function GET(request: Request) {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return NextResponse.error()
        }
        if (!currentUser.walletId) {
            return NextResponse.error()
        }
        const balance = await Stripe.balance('acct_1N4swnGa8Q0papfb')
        return NextResponse.json(balance)
    } catch (error: any) {
        throw new Error(error)
    }

} */

export async function PATCH(request: Request) {
    try {


        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.error()
        }

        if (currentUser.walletId) {
            const wallet = await Stripe.disconnect(currentUser.walletId)

            if (!wallet) {
                throw new Error('Stripe disconnect error')
            }

        }

        const user = await prisma.user.update({
            where: {
                id: currentUser.id
            },
            data: {
                walletId: null
            }
        })
        return NextResponse.json(user)
    } catch (error: any) {
        throw new Error(error)
    }


}