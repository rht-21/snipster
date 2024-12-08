import connectDB from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { _id: string } }
) => {
  try {
    await connectDB();

    const { _id } = params;

    const { snippetName, category, codeSnippet, keywords, isPublic } =
      await req.json();

    const updatedSnippet = {
      snippetName,
      category,
      codeSnippet,
      keywords,
      isPublic,
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

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { _id: string } }
) => {
  try {
    await connectDB();
    const { _id } = params;
    const deletedSnippet = await Snippet.findByIdAndDelete(_id);
    if (!deletedSnippet) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }
    return NextResponse.json(deletedSnippet);
  } catch (error) {
    console.error("Error deleting snippet:", error);
    return NextResponse.json(
      { error: "Error deleting snippet from database" },
      { status: 500 }
    );
  }
};
