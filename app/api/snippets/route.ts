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

export const PUT = async (req: Request) => {
  try {
    await connectDB();

    const { _id, snippetName, category, codeSnippet, keywords, isPublic } =
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

export const DELETE = async (req: Request) => {
  try {
    const { _id } = await req.json();
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
