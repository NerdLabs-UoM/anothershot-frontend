import nodemailer from 'nodemailer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const { to, subject, body } = await req.json();
        const { SMTP_EMAIL, MAILTRAP_USER, MAILTRAP_PASS } = process.env;

        var transport = nodemailer.createTransport({
            host: "live.smtp.mailtrap.io",
            port: 587,
            auth: {
                user: MAILTRAP_USER,
                pass: MAILTRAP_PASS
            }
        });

        const result = await transport.sendMail({
            from: SMTP_EMAIL,
            to,
            subject,
            html: body,
        });

        if (result.accepted.length > 0) {
            return NextResponse.json({ message: "Email sent successfully" });
        }
    } catch (error) {
        return NextResponse.json({ error: "Error sending email" });
    }
}
