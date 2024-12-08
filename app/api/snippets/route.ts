import connectDB from "@/lib/mongodb";
import Snippet from "@/models/Snippet";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    await connectDB();

    const {
      snippetName,
      category,
      codeSnippet,
      keywords,
      isPublic,
      createdBy,
    } = await req.json();

    const newSnippet = new Snippet({
      snippetName,
      category,
      codeSnippet,
      keywords,
      isPublic,
      createdBy,
    });

    console.log(newSnippet);

    await newSnippet.save();

    return NextResponse.json(
      {
        message: "Snippet created successfully",
        snippet: newSnippet,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating snippet:", error);
    return NextResponse.json(
      { error: "Error saving snippet to database" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const snippets = await Snippet.find();
    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return NextResponse.json(
      { error: "Error fetching snippets from database" },
      { status: 500 }
    );
  }
};
