import connectDB from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const url = new URL(req.url);
    const _id = url.searchParams.get("_id");
    const userId = url.searchParams.get("userId");

    const snippet = await Snippet.findById(_id);
    if (!snippet) {
      console.error("Snippet not found");
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    if (snippet.isPublic) {
      return NextResponse.json(snippet);
    } else if (snippet.createdBy.toString() === userId) {
      return NextResponse.json(snippet);
    } else {
      console.error("Privacy error: User does not have access");
      return NextResponse.json(
        { error: "Privacy error: You don't have access to this snippet" },
        { status: 403 }
      );
    }
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json(
      { error: "Error fetching snippets from database" },
      { status: 500 }
    );
  }
};
