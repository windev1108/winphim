import { GenreType } from "@/api/genre";
import { IGetDiscoverListParams, TimeWindow } from "@/api/movie";
import { server } from "@/api/server";
import { LanguageType } from "@/types/common";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const paramsQuery: Omit<IGetDiscoverListParams, 'genre'> = {
            language: searchParams.get("language") as LanguageType || "en-US",
            page: searchParams.get("page") || 1,
        };
        const genre = searchParams.get("genre") || 'all'

        const { data } = await server({
            url: `discover/${genre}`,
            method: "GET",
            params: paramsQuery,
        });

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
