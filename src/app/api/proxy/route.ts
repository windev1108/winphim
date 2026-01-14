// app/api/proxy/route.ts
import { NextRequest, NextResponse } from "next/server";
import http from "http";
import https from "https";
import { parse } from "url";

export const runtime = "nodejs"; // REQUIRED for streaming

function getHttpModule(url: string) {
    return url.startsWith("https") ? https : http;
}

export async function GET(req: NextRequest) {
    const url = req.nextUrl.searchParams.get("url");
    if (!url) {
        return NextResponse.json({ error: 'Missing URL' }, { status: 500 })
    }

    const parsed = parse(url);
    if (!parsed.hostname) {
        return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
    }

    return new Response(
        new ReadableStream({
            async start(controller) {
                const client = getHttpModule(url);

                const range = req.headers.get("range") || undefined;

                const upstreamReq = client.get(
                    url,
                    {
                        headers: {
                            "User-Agent": req.headers.get("user-agent") ?? "node",
                            ...(range ? { Range: range } : {}),
                        },
                    },
                    (upstreamRes) => {
                        const headers: Record<string, string> = {};

                        [
                            "content-type",
                            "content-length",
                            "accept-ranges",
                            "content-range",
                        ].forEach((h) => {
                            const v = upstreamRes.headers[h];
                            if (v) headers[h] = String(v);
                        });

                        // Write headers
                        controller.enqueue(
                            // @ts-ignore
                            new Uint8Array() // Force start
                        );

                        // Stream chunks
                        upstreamRes.on("data", (chunk) => {
                            controller.enqueue(chunk);
                        });

                        upstreamRes.on("end", () => {
                            controller.close();
                        });
                    }
                );

                upstreamReq.on("error", (err) => {
                    console.error(err);
                    controller.error(err);
                });
            },
        }),
        {
            status: 200,
            headers: {
                "Content-Type": "video/mp4",
                "Cache-Control": "no-cache",
            },
        }
    );
}
