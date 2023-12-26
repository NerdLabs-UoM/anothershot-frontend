import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(
    req: Request,
) {
    try {
        const { email, password, userRole } = await req.json();
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        if (user) {
            return new NextResponse("Email is already in use", { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data:{
                email,
                password: hashedPassword,
                userRole,
            }
        });
        console.log(newUser);
        return new NextResponse("User is registered", { status: 200 })
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 })
    }
}
