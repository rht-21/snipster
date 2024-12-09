import connectDB from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  _id: string;
};

export const PUT = async (
  req: Request,
  { params }: { params: { _id: string } }
) => {
  const { _id } = await params;
  try {
    await connectDB();

    const { snippetName, category, codeSnippet, keywords, isPublic } =
      await req.json();

    const updatedSnippet = {
      snippetName,
      category,
      codeSnippet,
      keywords,
      isPublic,
    };

    const snippet = await Snippet.findOneAndUpdate(
      { _id },
      { updatedSnippet },
      {
        new: true,
        runValidators: true,
      }
    );
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
  req: Request,
  { params }: { params: { _id: string } }
) => {
  const { _id } = await params;

  try {
    await connectDB();
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
