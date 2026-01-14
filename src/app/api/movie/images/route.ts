import { env } from "@/config/env";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug')
    const { data } = await axios({
      baseURL: env.NEXT_PUBLIC_API_MOVIE_URL,
      url: `/phim/${slug}/images`,
      method: "GET",
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
