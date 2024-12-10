import connectDB from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("_id");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID (_id) is required" },
        { status: 400 }
      );
    }

    await connectDB();

    const query = {
      $or: [
        { isPublic: true, likes: { $in: [userId] } },
        { isPublic: false, createdBy: userId, likes: { $in: [userId] } },
      ],
    };

    const snippets = await Snippet.find(query);

    if (snippets.length === 0) {
      console.error("No snippets found for the given conditions");
      return NextResponse.json({ error: "No snippets found" }, { status: 404 });
    }

    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json(
      { error: "Error fetching snippets from database" },
      { status: 500 }
    );
  }
};
