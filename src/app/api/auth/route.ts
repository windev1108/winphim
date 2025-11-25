import { env } from "@/config/env";
import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  const { data } = await axios({
    url: `${env.NEXT_PUBLIC_TMDB_API_URL}/${env.NEXT_PUBLIC_TMDB_API_VERSION}/authentication`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
      Accept: 'application/json'
    }
  }
    
  );
  return NextResponse.json(data);
}
