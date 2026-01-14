import { IMovieListParams } from "@/api/movie";
import { env } from "@/config/env";
import { SortFieldType, SortType } from "@/types/common";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug')
    const params: Omit<IMovieListParams, 'slug'> = {
      category: searchParams.get('category') || '',
      country: searchParams.get('country') || '',
      limit: searchParams.get('limit') || '10',
      page: searchParams.get('page') || '1',
      sort_field: searchParams.get('sort_field') as SortFieldType,
      sort_type: searchParams.get('sort_type') as SortType,
      year: searchParams.get('year') || '2025'
    };
    const { data } = await axios({
      baseURL: env.NEXT_PUBLIC_API_MOVIE_URL,
      url: `/danh-sach/${slug}`,
      method: "GET",
      params,
    });

    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
