import axios, { AxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { photographerId } = await req.json();

        if (!photographerId) {
            return NextResponse.json(
                {
                    error: "Photographer ID is required",
                    status: 400,
                },
                { status: 400 }
            );
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/photographer/${photographerId}/get`);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        const axiosError = error as AxiosError;
        return NextResponse.json(
            {
                error: axiosError.response?.data || "Internal server error",
                status: axiosError.response?.status || 500,
            },
            { status: axiosError.response?.status || 500 }
        );
    }
}