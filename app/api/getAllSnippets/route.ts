import connectDB from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();
    const snippets = await Snippet.find({ isPublic: true });
    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json(
      { error: "Error fetching snippets from database" },
      { status: 500 }
    );
  }
};
