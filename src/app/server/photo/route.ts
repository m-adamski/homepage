import { NextResponse } from "next/server";
import { getRandom } from "@/lib/unsplash";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (query && query !== "") {
        const randomPhoto = await getRandom(query);

        if (!randomPhoto) {
            return new Response("Error while getting random photo", { status: 500 });
        }

        return NextResponse.json(randomPhoto, {
            status: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type"
            }
        });

        // return NextResponse.json({
        //     url: "https://images.unsplash.com/photo-1545583257-23b2b9800500?crop=entropy&cs=srgb&fm=jpg&ixid=M3w0ODA4MDJ8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTA1NDcwMDh8&ixlib=rb-4.0.3&q=85",
        //     blurHash: "LH9u;=HvQwIXx@owahWBDAoztLtN",
        //     location: "One Forest in Dooars, Dooars, India",
        //     author: {
        //         name: "Boudhayan Bardhan",
        //         portfolioUrl: "https://unsplash.com/@yan_slg"
        //     }
        // }, {
        //     status: 200,
        //     headers: {
        //         "Access-Control-Allow-Origin": "*",
        //         "Access-Control-Allow-Methods": "GET",
        //         "Access-Control-Allow-Headers": "Content-Type"
        //     }
        // });
    }

    return new Response("Missing required params", { status: 400 });
}
