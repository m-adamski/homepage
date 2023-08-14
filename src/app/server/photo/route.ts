import { NextResponse } from "next/server";
import { getRandom } from "@/lib/unsplash";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (query && query !== "") {
        const randomPhoto = await getRandom(query);

        if (!randomPhoto) {
            return NextResponse.json({ message: "An error occurred while trying to fetch a new background" }, { status: 500 });
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

    return NextResponse.json({ message: "Missing required 'query' param" }, { status: 400 });
}
