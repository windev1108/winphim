import { server } from "@/api/server";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const { data } = await server({
            url: `/nam-phat-hanh`,
            method: "GET",
        });

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
