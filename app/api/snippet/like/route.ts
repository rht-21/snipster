import connectDB from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { NextResponse } from "next/server";

export const PUT = async (req: Request) => {
  try {
    await connectDB();

    const { _id, likes } = await req.json();

    const updatedSnippet = {
      likes,
    };

    const snippet = await Snippet.findByIdAndUpdate(_id, updatedSnippet, {
      new: true,
      runValidators: true,
    });
    if (!snippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    return NextResponse.json(snippet);
  } catch (error) {
    console.error("Error fetching snippet:", error);
    return NextResponse.json(
      { error: "Error fetching snippet from database" },
      { status: 500 }
    );
  }
};
