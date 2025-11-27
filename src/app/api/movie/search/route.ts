import { server } from "@/api/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword')
    const { data } = await server({
      url: `/tim-kiem?keyword=${keyword}`,
      method: "GET",
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
